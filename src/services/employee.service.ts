import prisma from '../utils/prisma';
import { AppError } from '../middlewares/error.middleware';
import { AIService } from './ai.service';

// Fields safe to return in public-facing list and basic lookups
const EMPLOYEE_PUBLIC_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  title: true,
  department: true,
  systemRole: false, // internal field — do not expose
  createdAt: true,
  // passwordHash intentionally omitted
} as const;

export class EmployeeService {
  static async getEmployees(page: number, limit: number, filters: any = {}) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { title: { contains: filters.search, mode: 'insensitive' } }
      ];
    }
    if (filters.department) {
      where.department = filters.department;
    }
    if (filters.role) {
      where.title = filters.role;
    }

    const [total, employees] = await Promise.all([
      prisma.employee.count({ where }),
      prisma.employee.findMany({
        where,
        skip,
        take: limit,
        select: EMPLOYEE_PUBLIC_SELECT,
        orderBy: { createdAt: 'desc' },
      })
    ]);

    return {
      employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getEmployeeById(id: string) {
    const employee = await prisma.employee.findUnique({
      where: { id },
      // Explicit select — passwordHash and other internal fields excluded (finding Z3/S1)
      select: EMPLOYEE_PUBLIC_SELECT,
    });
    if (!employee) throw new AppError(404, 'NOT_FOUND', 'Employee not found');
    return employee;
  }

  static async getEmployeeProfile(id: string) {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        experiences: true,
        projects: {
          // Never return raw embedding vectors in API responses
          select: {
            id: true,
            employeeId: true,
            name: true,
            description: true,
            startDate: true,
            endDate: true,
            createdAt: true,
            updatedAt: true,
          }
        },
        skills: {
          include: {
            skill: true,
            evidence: true
          }
        },
        careerGoals: true,
        roleMatches: {
          include: {
            role: true
          }
        }
      }
    });

    if (!employee) throw new AppError(404, 'NOT_FOUND', 'Employee not found');

    // Strip sensitive fields before returning
    const { passwordHash: _, ...safeEmployee } = employee as any;
    return safeEmployee;
  }

  static async getEmployeeMatches(id: string) {
    const matches = await prisma.roleMatch.findMany({
      where: { employeeId: id },
      include: {
        role: {
          select: {
            id: true,
            title: true,
            department: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          }
        },
        employee: {
          select: {
            firstName: true,
            lastName: true,
            title: true,
            department: true,
          }
        }
      },
      orderBy: { score: 'desc' }
    });

    // Attach AI explanations
    const matchesWithAI = await Promise.all(matches.map(async (match) => {
      const explanation = await AIService.generateMatchExplanation(match.employee, match.role);
      
      // We don't want to send the entire employee object back in each match
      const { employee, ...matchData } = match;
      return {
        ...matchData,
        explanation
      };
    }));

    return matchesWithAI;
  }
}
