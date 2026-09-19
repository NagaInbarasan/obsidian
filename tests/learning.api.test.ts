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
import { LearningService } from '../src/services/learning.service';

vi.mock('../src/services/learning.service', () => ({
  LearningService: {
    getLearningResources: vi.fn().mockResolvedValue({
      resources: [{ id: 'uuid-1', title: 'Course 1' }],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 }
    })
  }
}));

describe('Learning API', () => {
  const token = `Bearer ${realToken}`;

  it('should list learning resources', async () => {
    const res = await request(app).get('/api/v1/learning-resources').set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
  });
});
