import { Request, Response, NextFunction } from 'express';
import { LearningService } from '../services/learning.service';
import { sendSuccess } from '../utils/response';

export class LearningController {
  static async getLearningResources(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const result = await LearningService.getLearningResources(page, limit);
      sendSuccess(res, result.resources, 'Learning resources retrieved successfully', 200, result.pagination);
    } catch (err) { next(err); }
  }
}
