import { Request, Response, NextFunction } from 'express';
import { RoleService } from '../services/role.service';
import { sendSuccess } from '../utils/response';

export class RoleController {
  static async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const result = await RoleService.getRoles(page, limit);
      sendSuccess(res, result.roles, 'Roles retrieved successfully', 200, result.pagination);
    } catch (err) { next(err); }
  }

  static async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const role = await RoleService.getRoleById(id);
      sendSuccess(res, role);
    } catch (err) { next(err); }
  }

  static async getRoleMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const matches = await RoleService.getRoleMatches(id);
      sendSuccess(res, matches);
    } catch (err) { next(err); }
  }
}
