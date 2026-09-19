import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';
import { config } from '../config';

// Typed shape of the JWT payload we sign
export interface AuthUser {
  id: string;
  role: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Augment Express Request so TypeScript knows req.user is safe to access
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

/**
 * Verifies a Bearer JWT and attaches the decoded payload to req.user.
 * Returns 401 if the token is missing, malformed, or expired.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new AppError(401, 'UNAUTHORIZED', 'Missing or invalid authorization header'));
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AuthUser;
    req.user = decoded;
    next();
  } catch (err) {
    console.log('JWT Error:', err);
    next(new AppError(401, 'UNAUTHORIZED', 'Invalid or expired token'));
  }
};

/**
 * Requires the authenticated user to have one of the specified roles.
 * Must be used after `authenticate`.
 */
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new AppError(403, 'FORBIDDEN', 'Insufficient permissions'));
      return;
    }
    next();
  };
};

/**
 * Allows access only if:
 *   - the authenticated user's id matches `resourceOwnerId`, OR
 *   - the authenticated user has HR or ADMIN role.
 *
 * Use this to protect IDOR-sensitive endpoints (profile, matches, etc.)
 */
export const requireOwnerOrRole = (resourceOwnerId: string, privilegedRoles = ['HR', 'ADMIN']) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!user) {
      next(new AppError(401, 'UNAUTHORIZED', 'Authentication required'));
      return;
    }
    if (user.id === resourceOwnerId || privilegedRoles.includes(user.role)) {
      next();
      return;
    }
    next(new AppError(403, 'FORBIDDEN', 'You do not have permission to access this resource'));
  };
};
