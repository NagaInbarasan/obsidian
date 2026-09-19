import request from 'supertest';
import { describe, it, expect, vi } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      $connect() {}
      $disconnect() {}
    }
  };
});

import { config } from '../src/config';

const realToken = jwt.sign({ id: '123e4567-e89b-12d3-a456-426614174000', role: 'EMPLOYEE' }, config.jwtSecret);

import app from '../src/app';
import { EmployeeService } from '../src/services/employee.service';

// Mock the EmployeeService so we don't need a real DB for these controller tests
vi.mock('../src/services/employee.service', () => ({
  EmployeeService: {
    getEmployees: vi.fn().mockResolvedValue({
      employees: [{ id: 'uuid-1', firstName: 'Alice' }],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 }
    }),
    getEmployeeById: vi.fn().mockResolvedValue({ id: 'uuid-1', firstName: 'Alice' }),
    getEmployeeProfile: vi.fn(),
    getEmployeeMatches: vi.fn()
  }
}));

describe('Employee API', () => {
  const token = `Bearer ${realToken}`;

  it('should return 401 if missing auth header', async () => {
    const res = await request(app).get('/api/v1/employees');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should retrieve employees when authenticated', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.pagination).toBeDefined();
  });

  it('should validate UUID path param', async () => {
    const res = await request(app)
      .get('/api/v1/employees/invalid-uuid')
      .set('Authorization', token);

    // Zod validation should catch this
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should retrieve employee by valid UUID', async () => {
    const validUuid = '123e4567-e89b-12d3-a456-426614174000';
    const res = await request(app)
      .get(`/api/v1/employees/${validUuid}`)
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('uuid-1');
  });

  it('should retrieve employee profile', async () => {
    const validUuid = '123e4567-e89b-12d3-a456-426614174000';
    vi.mocked(EmployeeService.getEmployeeProfile).mockResolvedValue({ id: validUuid, firstName: 'Alice' } as any);
    
    const res = await request(app)
      .get(`/api/v1/employees/${validUuid}/profile`)
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(validUuid);
  });

  it('should retrieve employee matches', async () => {
    const validUuid = '123e4567-e89b-12d3-a456-426614174000';
    vi.mocked(EmployeeService.getEmployeeMatches).mockResolvedValue([{ id: 'match1' }] as any);
    
    const res = await request(app)
      .get(`/api/v1/employees/${validUuid}/matches`)
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });
});
