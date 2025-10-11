import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import logger from '../utils/logger';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  logger.error({
    error: err,
    path: req.path,
    method: req.method,
  });

  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Invalid request data',
      details: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: 'CONFLICT',
        message: 'Resource already exists',
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Resource not found',
      });
    }
  }

  // App errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      message: err.message,
    });
  }

  // Default error
  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong',
  });
};

export default errorHandler;
