import { Request, Response, NextFunction } from 'express';
import { HRService } from '../services/hr.service';
import { sendSuccess } from '../utils/response';

export class HRController {
  static async getWorkforceMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await HRService.getWorkforceMetrics();
      sendSuccess(res, data);
    } catch (err) { next(err); }
  }

  static async getSkillDistribution(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await HRService.getSkillDistribution();
      sendSuccess(res, data);
    } catch (err) { next(err); }
  }

  static async getDepartmentSkills(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await HRService.getDepartmentSkills();
      sendSuccess(res, data);
    } catch (err) { next(err); }
  }

  static async getEmergingSkills(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await HRService.getEmergingSkills();
      sendSuccess(res, data);
    } catch (err) { next(err); }
  }

  static async getSkillGaps(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await HRService.getSkillGaps();
      sendSuccess(res, data);
    } catch (err) { next(err); }
  }

  static async getRoleDemand(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await HRService.getRoleDemand();
      sendSuccess(res, data);
    } catch (err) { next(err); }
  }

  static async getTalentDiscovery(req: Request, res: Response, next: NextFunction) {
    try {
      const { role, department, skill, experience } = req.query as any;
      const data = await HRService.getTalentDiscovery(role, department, skill, experience ? parseInt(experience) : undefined);
      sendSuccess(res, data);
    } catch (err) { next(err); }
  }

  static async getMobilitySeekers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await HRService.getMobilitySeekers();
      sendSuccess(res, data);
    } catch (err) { next(err); }
  }

  static async getMobilityOpportunities(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await HRService.getMobilityOpportunities();
      sendSuccess(res, data);
    } catch (err) { next(err); }
  }
}
