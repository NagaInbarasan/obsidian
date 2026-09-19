import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodTypeAny, ZodError } from 'zod';
import { sendError } from '../utils/response';

export const validateRequest = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const flat = err.flatten();
        const msgs = [
          ...Object.entries(flat.fieldErrors).map(([field, errors]) => `${field}: ${((errors as string[]) ?? []).join(', ')}`),
          ...flat.formErrors
        ];
        return sendError(res, 'VALIDATION_ERROR', msgs.join('; '), 400);
      }
      next(err);
    }
  };
};
