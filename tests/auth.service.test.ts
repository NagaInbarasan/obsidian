import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthService } from '../src/services/auth.service';
import prisma from '../src/utils/prisma';
import { AppError } from '../src/middlewares/error.middleware';

vi.mock('../src/utils/prisma', () => {
  return {
    default: {
      employee: {
        findUnique: vi.fn(),
        create: vi.fn(),
      }
    }
  };
});

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_password'),
    compare: vi.fn(),
  }
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('jwt-token'),
  }
}));

describe('AuthService Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('should throw error if email exists', async () => {
      (prisma.employee.findUnique as any).mockResolvedValue({ id: '1' });
      
      await expect(AuthService.register({
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'password'
      })).rejects.toThrow(AppError);
    });

    it('should create employee and return token', async () => {
      (prisma.employee.findUnique as any).mockResolvedValue(null);
      (prisma.employee.create as any).mockResolvedValue({ id: '1', email: 'test@test.com', systemRole: 'EMPLOYEE' });

      const res = await AuthService.register({
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'password'
      });

      expect(res.token).toBe('jwt-token');
      expect(prisma.employee.create).toHaveBeenCalledWith(expect.objectContaining({
        data: {
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'User',
          passwordHash: 'hashed_password',
          systemRole: 'EMPLOYEE'
        }
      }));
    });
  });

  describe('login', () => {
    it('should throw error on invalid password', async () => {
      (prisma.employee.findUnique as any).mockResolvedValue({ id: '1', passwordHash: 'hash' });
      (bcrypt.compare as any).mockResolvedValue(false);

      await expect(AuthService.login({ email: 'test@test.com', password: 'wrong' })).rejects.toThrow(AppError);
    });

    it('should throw error if user not found', async () => {
      (prisma.employee.findUnique as any).mockResolvedValue(null);
      (bcrypt.compare as any).mockResolvedValue(false);

      await expect(AuthService.login({ email: 'test@test.com', password: 'wrong' })).rejects.toThrow(AppError);
    });

    it('should return employee and token on success', async () => {
      (prisma.employee.findUnique as any).mockImplementation((args: any) => {
        if (args.select) {
          return { id: '1', email: 'test@test.com', systemRole: 'EMPLOYEE' };
        }
        return { id: '1', email: 'test@test.com', passwordHash: 'hash' };
      });
      (bcrypt.compare as any).mockResolvedValue(true);

      const res = await AuthService.login({ email: 'test@test.com', password: 'password' });
      expect(res.token).toBe('jwt-token');
      expect(res.employee?.id).toBe('1');
    });
  });
});
