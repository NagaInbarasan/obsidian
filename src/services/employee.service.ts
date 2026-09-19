import prisma from '../utils/prisma';
import { AppError } from '../middlewares/error.middleware';

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
  static async getEmployees(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [total, employees] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.findMany({
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
        careerGoals: true
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
            // embedding intentionally excluded
          }
        }
      },
      orderBy: { score: 'desc' }
    });
    return matches;
  }
}
