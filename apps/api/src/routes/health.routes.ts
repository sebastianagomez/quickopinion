import { Router } from 'express';
import prisma from '../config/database';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
