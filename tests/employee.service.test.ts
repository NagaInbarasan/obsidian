import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmployeeService } from '../src/services/employee.service';
import prisma from '../src/utils/prisma';
import { AppError } from '../src/middlewares/error.middleware';

vi.mock('../src/utils/prisma', () => {
  return {
    default: {
      employee: {
        count: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      roleMatch: {
        findMany: vi.fn(),
      }
    }
  };
});

describe('EmployeeService Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEmployees', () => {
    it('should return paginated employees', async () => {
      (prisma.employee.count as any).mockResolvedValue(1);
      (prisma.employee.findMany as any).mockResolvedValue([{ id: '1', firstName: 'Alice' }]);

      const result = await EmployeeService.getEmployees(1, 10);

      expect(prisma.employee.count).toHaveBeenCalled();
      expect(prisma.employee.findMany).toHaveBeenCalledWith(expect.objectContaining({
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' }
      }));
      expect(result.pagination.total).toBe(1);
      expect(result.pagination.totalPages).toBe(1);
      expect(result.employees.length).toBe(1);
    });
  });

  describe('getEmployeeById', () => {
    it('should throw NOT_FOUND if employee does not exist', async () => {
      (prisma.employee.findUnique as any).mockResolvedValue(null);

      await expect(EmployeeService.getEmployeeById('1')).rejects.toThrow(AppError);
    });

    it('should return employee if found', async () => {
      (prisma.employee.findUnique as any).mockResolvedValue({ id: '1', firstName: 'Alice' });

      const employee = await EmployeeService.getEmployeeById('1');
      expect(employee.id).toBe('1');
    });
  });

  describe('getEmployeeProfile', () => {
    it('should throw NOT_FOUND if employee does not exist', async () => {
      (prisma.employee.findUnique as any).mockResolvedValue(null);

      await expect(EmployeeService.getEmployeeProfile('1')).rejects.toThrow(AppError);
    });

    it('should strip passwordHash from profile', async () => {
      (prisma.employee.findUnique as any).mockResolvedValue({
        id: '1',
        firstName: 'Alice',
        passwordHash: 'secret'
      });

      const profile = await EmployeeService.getEmployeeProfile('1');
      expect((profile as any).passwordHash).toBeUndefined();
    });
  });

  describe('getEmployeeMatches', () => {
    it('should return role matches', async () => {
      (prisma.roleMatch.findMany as any).mockResolvedValue([{ id: 'm1', score: 95 }]);

      const matches = await EmployeeService.getEmployeeMatches('1');
      expect(matches.length).toBe(1);
      expect(prisma.roleMatch.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: { employeeId: '1' }
      }));
    });
  });
});
