import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/employee.service';
import { sendSuccess } from '../utils/response';
import { AppError } from '../middlewares/error.middleware';

export class EmployeeController {
  static async getEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query as any;
      const result = await EmployeeService.getEmployees(page, limit);
      sendSuccess(res, result.employees, 'Employees retrieved successfully', 200, result.pagination);
    } catch (err) { next(err); }
  }

  static async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const employee = await EmployeeService.getEmployeeById(id);
      sendSuccess(res, employee);
    } catch (err) { next(err); }
  }

  /**
   * IDOR-protected: only the employee themselves or HR/ADMIN may view full profiles.
   */
  static async getEmployeeProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const user = req.user!;

      if (user.id !== id && !['HR', 'ADMIN'].includes(user.role)) {
        return next(new AppError(403, 'FORBIDDEN', 'You do not have permission to view this profile'));
      }

      const profile = await EmployeeService.getEmployeeProfile(id);
      sendSuccess(res, profile);
    } catch (err) { next(err); }
  }

  /**
   * IDOR-protected: only the employee themselves or HR/ADMIN may view role matches.
   */
  static async getEmployeeMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const user = req.user!;

      if (user.id !== id && !['HR', 'ADMIN'].includes(user.role)) {
        return next(new AppError(403, 'FORBIDDEN', 'You do not have permission to view these matches'));
      }

      const matches = await EmployeeService.getEmployeeMatches(id);
      sendSuccess(res, matches);
    } catch (err) { next(err); }
  }
}
