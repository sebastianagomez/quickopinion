import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { pino } from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root
app.get('/', (_req, res) => {
  res.json({
    name: 'QuickOpinion API',
    version: '1.0.0',
    status: 'running',
  });
});

app.listen(PORT, () => {
  logger.info(`🚀 API listening on port ${PORT}`);
});

export default app;

