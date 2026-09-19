import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RoleService } from '../src/services/role.service';
import { SkillService } from '../src/services/skill.service';
import { LearningService } from '../src/services/learning.service';
import prisma from '../src/utils/prisma';
import { AppError } from '../src/middlewares/error.middleware';

vi.mock('../src/utils/prisma', () => {
  return {
    default: {
      role: {
        count: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      roleMatch: {
        findMany: vi.fn(),
      },
      skill: {
        count: vi.fn(),
        findMany: vi.fn(),
      },
      learningResource: {
        count: vi.fn(),
        findMany: vi.fn(),
      },
    }
  };
});

describe('Other Services Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('RoleService', () => {
    it('getRoles returns paginated data', async () => {
      (prisma.role.count as any).mockResolvedValue(1);
      (prisma.role.findMany as any).mockResolvedValue([{ id: '1' }]);
      const res = await RoleService.getRoles(1, 10);
      expect(res.roles.length).toBe(1);
    });

    it('getRoleById throws NOT_FOUND', async () => {
      (prisma.role.findUnique as any).mockResolvedValue(null);
      await expect(RoleService.getRoleById('1')).rejects.toThrow(AppError);
    });

    it('getRoleById returns role', async () => {
      (prisma.role.findUnique as any).mockResolvedValue({ id: '1' });
      const res = await RoleService.getRoleById('1');
      expect(res.id).toBe('1');
    });

    it('getRoleMatches returns matches', async () => {
      (prisma.roleMatch.findMany as any).mockResolvedValue([{ id: 'm1' }]);
      const res = await RoleService.getRoleMatches('1');
      expect(res.length).toBe(1);
    });
  });

  describe('SkillService', () => {
    it('getSkills returns paginated data', async () => {
      (prisma.skill.count as any).mockResolvedValue(1);
      (prisma.skill.findMany as any).mockResolvedValue([{ id: '1' }]);
      const res = await SkillService.getSkills(1, 10);
      expect(res.skills.length).toBe(1);
    });
  });

  describe('LearningService', () => {
    it('getLearningResources returns paginated data', async () => {
      (prisma.learningResource.count as any).mockResolvedValue(1);
      (prisma.learningResource.findMany as any).mockResolvedValue([{ id: '1' }]);
      const res = await LearningService.getLearningResources(1, 10);
      expect(res.resources.length).toBe(1);
    });
  });
});
