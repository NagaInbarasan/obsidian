import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { AppError } from '../middlewares/error.middleware';
import { config } from '../config';
import type { AuthUser } from '../middlewares/auth.middleware';

// Only these fields are safe to include in JWT payload and API responses
const SAFE_EMPLOYEE_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  title: true,
  department: true,
  systemRole: true,
  createdAt: true,
  updatedAt: true,
  // passwordHash intentionally excluded
} as const;

export class AuthService {
  static async register(data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    // systemRole NOT accepted from external input — always defaults to EMPLOYEE
  }) {
    const existing = await prisma.employee.findUnique({
      where: { email: data.email }
    });
    if (existing) {
      // Vague message to prevent user enumeration
      throw new AppError(400, 'VALIDATION_ERROR', 'Email is already in use');
    }

    const passwordHash = await bcrypt.hash(data.password, 12); // 12 rounds for production

    const employee = await prisma.employee.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash,
        systemRole: 'EMPLOYEE', // Always EMPLOYEE — never trust client input for role
      },
      select: SAFE_EMPLOYEE_SELECT,
    });

    const token = this.generateToken(employee);
    return { employee, token };
  }

  static async login(data: { email: string; password: string }) {
    // Fetch employee including passwordHash only for verification — never returned
    const employee = await prisma.employee.findUnique({
      where: { email: data.email },
    });

    // Use constant-time comparison via bcrypt.compare even when user not found
    // to prevent timing-based user enumeration
    const dummyHash = '$2b$12$invalidhashfortimingprotection000000000000000000000000';
    const hashToCompare = employee?.passwordHash ?? dummyHash;
    const valid = await bcrypt.compare(data.password, hashToCompare);

    if (!employee || !employee.passwordHash || !valid) {
      throw new AppError(401, 'UNAUTHORIZED', 'Invalid email or password');
    }

    // Re-fetch with safe select to avoid accidentally exposing passwordHash
    const safeEmployee = await prisma.employee.findUnique({
      where: { id: employee.id },
      select: SAFE_EMPLOYEE_SELECT,
    });

    const token = this.generateToken(safeEmployee!);
    return { employee: safeEmployee, token };
  }

  private static generateToken(employee: { id: string; email: string; systemRole: string }) {
    const payload: AuthUser = {
      id: employee.id,
      role: employee.systemRole,
      email: employee.email,
    };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });
  }
}
