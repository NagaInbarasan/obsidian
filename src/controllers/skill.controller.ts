import { Request, Response, NextFunction } from 'express';
import { SkillService } from '../services/skill.service';
import { sendSuccess } from '../utils/response';

export class SkillController {
  static async getSkills(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const result = await SkillService.getSkills(page, limit);
      sendSuccess(res, result.skills, 'Skills retrieved successfully', 200, result.pagination);
    } catch (err) { next(err); }
  }
}
