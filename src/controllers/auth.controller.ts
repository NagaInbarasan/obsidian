import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      sendSuccess(res, result, 'User registered successfully', 201);
    } catch (err) { next(err); }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      sendSuccess(res, result, 'Login successful');
    } catch (err) { next(err); }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccess(res, req.user);
    } catch (err) { next(err); }
  }
}
