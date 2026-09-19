import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, message?: string, statusCode = 200, pagination?: any) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
    pagination,
  });
};

export const sendError = (res: Response, code: string, message: string, statusCode = 400) => {
  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    },
  });
};
