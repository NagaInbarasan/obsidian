import prisma from '../utils/prisma';
import { AppError } from '../middlewares/error.middleware';

export class RoleService {
  static async getRoles(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [total, roles] = await Promise.all([
      prisma.role.count(),
      prisma.role.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })
    ]);

    return {
      roles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getRoleById(id: string) {
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        skills: {
          include: { skill: true }
        }
      }
    });
    if (!role) throw new AppError(404, 'NOT_FOUND', 'Role not found');
    return role;
  }

  static async getRoleMatches(id: string) {
    const matches = await prisma.roleMatch.findMany({
      where: { roleId: id },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            title: true,
            department: true
          }
        }
      },
      orderBy: { score: 'desc' }
    });
    return matches;
  }
}
