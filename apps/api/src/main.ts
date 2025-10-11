import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import logger from './utils/logger';
import errorHandler from './middleware/errorHandler';
import './config/database'; // Initialize database connection

// Routes
import healthRoutes from './routes/health.routes';
import quizRoutes from './routes/quiz.routes';

const app = express();
const PORT = env.API_PORT || 3000;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'development' ? '*' : [], // Configure in production
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, _res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
  });
  next();
});

// Routes
app.use('/health', healthRoutes);
app.use('/api/quiz', quizRoutes);

// Root
app.get('/', (_req, res) => {
  res.json({
    name: 'QuickOpinion API',
    version: '1.0.0',
    status: 'running',
    environment: env.NODE_ENV,
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 QuickOpinion API listening on port ${PORT}`);
  logger.info(`📝 Environment: ${env.NODE_ENV}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app;
