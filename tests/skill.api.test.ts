import request from 'supertest';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      $connect() {}
      $disconnect() {}
    }
  };
});

import jwt from 'jsonwebtoken';
import { config } from '../src/config';

const realToken = jwt.sign({ id: 'uuid-1', role: 'EMPLOYEE', email: 'test@example.com' }, config.jwtSecret);

import app from '../src/app';
import { SkillService } from '../src/services/skill.service';

vi.mock('../src/services/skill.service', () => ({
  SkillService: {
    getSkills: vi.fn().mockResolvedValue({
      skills: [{ id: 'uuid-1', name: 'JavaScript' }],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 }
    })
  }
}));

describe('Skill API', () => {
  const token = `Bearer ${realToken}`;

  it('should list skills', async () => {
    const res = await request(app).get('/api/v1/skills').set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
  });
});
