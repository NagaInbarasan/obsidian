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

const realToken = jwt.sign({ id: 'uuid-1', role: 'HR', email: 'hr@example.com' }, config.jwtSecret);

import app from '../src/app';
import { RoleService } from '../src/services/role.service';

vi.mock('../src/services/role.service', () => ({
  RoleService: {
    getRoles: vi.fn().mockResolvedValue({
      roles: [{ id: 'uuid-1', title: 'Engineer' }],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 }
    }),
    getRoleById: vi.fn().mockResolvedValue({ id: 'uuid-1', title: 'Engineer' }),
    getRoleMatches: vi.fn().mockResolvedValue([{ id: 'match-1', score: 90 }])
  }
}));

describe('Role API', () => {
  const token = `Bearer ${realToken}`;

  it('should list roles', async () => {
    const res = await request(app).get('/api/v1/roles').set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  it('should get role by id', async () => {
    const res = await request(app).get('/api/v1/roles/123e4567-e89b-12d3-a456-426614174000').set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('uuid-1');
  });

  it('should get role matches', async () => {
    const res = await request(app).get('/api/v1/roles/123e4567-e89b-12d3-a456-426614174000/matches').set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });
});
