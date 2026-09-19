import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export class AppError extends Error {
  constructor(public statusCode: number, public code: string, message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return sendError(res, err.code, err.message, err.statusCode);
  }

  // Log full error server-side (including stack) but never expose internals to client (finding S7)
  console.error('[ERROR]', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  return sendError(res, 'INTERNAL_SERVER_ERROR', 'An unexpected error occurred.', 500);
};
