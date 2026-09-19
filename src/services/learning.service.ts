import prisma from '../utils/prisma';

export class LearningService {
  static async getLearningResources(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [total, resources] = await Promise.all([
      prisma.learningResource.count(),
      prisma.learningResource.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })
    ]);

    return {
      resources,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
