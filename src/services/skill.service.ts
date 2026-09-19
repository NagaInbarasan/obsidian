import prisma from '../utils/prisma';

export class SkillService {
  static async getSkills(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [total, skills] = await Promise.all([
      prisma.skill.count(),
      prisma.skill.findMany({
        skip,
        take: limit,
        include: {
          category: true,
        },
        orderBy: { name: 'asc' },
      })
    ]);

    return {
      skills,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
