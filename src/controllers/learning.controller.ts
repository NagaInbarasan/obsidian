import { Request, Response, NextFunction } from 'express';
import { LearningService } from '../services/learning.service';
import { sendSuccess } from '../utils/response';

export class LearningController {
  static async getLearningResources(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query as any;
      const result = await LearningService.getLearningResources(page, limit);
      sendSuccess(res, result.resources, 'Learning resources retrieved successfully', 200, result.pagination);
    } catch (err) { next(err); }
  }
}
