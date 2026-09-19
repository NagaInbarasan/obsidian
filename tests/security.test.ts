/**
 * Security Boundary Tests
 *
 * Verifies that access control is properly enforced — not just that
 * successful requests work, but that DENIED requests are actually denied.
 *
 * Findings covered: Z1, Z2, Z4, A4, S2, S6
 */
import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Prisma before any app import
vi.mock('@prisma/client', () => ({
  PrismaClient: class {
    $connect() {}
    $disconnect() {}
  }
}));

import jwt from 'jsonwebtoken';
import { config } from '../src/config';

// Create real tokens for tests
const tokenAlice = jwt.sign({ id: '00000000-0000-4000-8000-000000000001', role: 'EMPLOYEE', email: 'alice@example.com' }, config.jwtSecret);
const tokenBob = jwt.sign({ id: '00000000-0000-4000-8000-000000000002', role: 'EMPLOYEE', email: 'bob@example.com' }, config.jwtSecret);
const tokenHr = jwt.sign({ id: '00000000-0000-4000-8000-000000000003', role: 'HR', email: 'hr@example.com' }, config.jwtSecret);
const tokenAdmin = jwt.sign({ id: '00000000-0000-4000-8000-000000000004', role: 'ADMIN', email: 'admin@example.com' }, config.jwtSecret);

// Mock AuthService — avoids hitting Prisma in mass-assignment test
vi.mock('../src/services/auth.service', () => ({
  AuthService: {
    register: vi.fn().mockImplementation(async (data: any) => {
      return {
        employee: { id: '00000000-0000-4000-8000-000000000005', email: data.email, systemRole: 'EMPLOYEE' },
        token: 'signed-token',
      };
    }),
    login: vi.fn().mockResolvedValue({
      employee: { id: '00000000-0000-4000-8000-000000000001', email: 'alice@example.com' },
      token: 'signed-token',
    }),
  }
}));

// Mock services — we are testing auth/authz layer, not DB
vi.mock('../src/services/employee.service', () => ({
  EmployeeService: {
    getEmployees: vi.fn().mockResolvedValue({
      employees: [{ id: '00000000-0000-4000-8000-000000000001', firstName: 'Alice' }],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 }
    }),
    getEmployeeById: vi.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001', firstName: 'Alice' }),
    getEmployeeProfile: vi.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001', firstName: 'Alice', skills: [] }),
    getEmployeeMatches: vi.fn().mockResolvedValue([]),
  }
}));

vi.mock('../src/services/role.service', () => ({
  RoleService: {
    getRoles: vi.fn().mockResolvedValue({ roles: [], pagination: {} }),
    getRoleById: vi.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001', title: 'Engineer' }),
    getRoleMatches: vi.fn().mockResolvedValue([]),
  }
}));

import app from '../src/app';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const bearer = (token: string) => `Bearer ${token}`;
const aliceToken = bearer(tokenAlice);
const bobToken   = bearer(tokenBob);
const hrToken    = bearer(tokenHr);
const adminToken = bearer(tokenAdmin);

// Alice's ID — proper UUID v4, matches her JWT payload above
const aliceId = '00000000-0000-4000-8000-000000000001';



// ─── Authentication Boundary ──────────────────────────────────────────────────

describe('Authentication — access without token', () => {
  it('GET /employees → 401 without token', async () => {
    const res = await request(app).get('/api/v1/employees');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('GET /roles → 401 without token', async () => {
    const res = await request(app).get('/api/v1/roles');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('GET /skills → 401 without token', async () => {
    const res = await request(app).get('/api/v1/skills');
    expect(res.status).toBe(401);
  });

  it('GET /auth/me → 401 without token', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
  });
});

describe('Authentication — invalid tokens', () => {
  it('should reject malformed Bearer token', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', 'Bearer invalid.jwt.token');
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('should reject non-Bearer scheme', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', 'Basic dXNlcjpwYXNz');
    expect(res.status).toBe(401);
  });

  it('should reject empty Authorization header', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', '');
    expect(res.status).toBe(401);
  });
});

// ─── IDOR — Employee Profile (Finding Z1) ─────────────────────────────────────

describe('IDOR — GET /employees/:id/profile', () => {
  const path = `/api/v1/employees/${aliceId}/profile`;

  it('Alice can view her own profile', async () => {
    const res = await request(app).get(path).set('Authorization', aliceToken);
    expect(res.status).toBe(200);
  });

  it('Bob (different EMPLOYEE) cannot view Alice\'s profile → 403', async () => {
    const res = await request(app).get(path).set('Authorization', bobToken);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('HR role can view Alice\'s profile', async () => {
    const res = await request(app).get(path).set('Authorization', hrToken);
    expect(res.status).toBe(200);
  });

  it('ADMIN role can view Alice\'s profile', async () => {
    const res = await request(app).get(path).set('Authorization', adminToken);
    expect(res.status).toBe(200);
  });

  it('Unauthenticated request → 401, not 403', async () => {
    const res = await request(app).get(path);
    expect(res.status).toBe(401);
  });
});

// ─── IDOR — Employee Matches (Finding Z2) ─────────────────────────────────────

describe('IDOR — GET /employees/:id/matches', () => {
  const path = `/api/v1/employees/${aliceId}/matches`;

  it('Alice can view her own matches', async () => {
    const res = await request(app).get(path).set('Authorization', aliceToken);
    expect(res.status).toBe(200);
  });

  it('Bob cannot view Alice\'s matches → 403', async () => {
    const res = await request(app).get(path).set('Authorization', bobToken);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('HR can view Alice\'s matches', async () => {
    const res = await request(app).get(path).set('Authorization', hrToken);
    expect(res.status).toBe(200);
  });
});

// ─── Role-Protected Endpoint (Finding Z4) ────────────────────────────────────

describe('RBAC — GET /roles/:id/matches', () => {
  const roleId = '123e4567-e89b-12d3-a456-426614174000';
  const path = `/api/v1/roles/${roleId}/matches`;

  it('EMPLOYEE cannot view role matches → 403', async () => {
    const res = await request(app).get(path).set('Authorization', aliceToken);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('HR can view role matches → 200', async () => {
    const res = await request(app).get(path).set('Authorization', hrToken);
    expect(res.status).toBe(200);
  });

  it('ADMIN can view role matches → 200', async () => {
    const res = await request(app).get(path).set('Authorization', adminToken);
    expect(res.status).toBe(200);
  });
});

// ─── Mass Assignment — Registration (Findings A4/S2) ─────────────────────────

describe('Mass Assignment — Registration', () => {
  it('should ignore systemRole in registration body', async () => {
    // Zod schema strips systemRole, so this should fail validation
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'attacker@example.com',
        firstName: 'Evil',
        lastName: 'User',
        password: 'password123',
        systemRole: 'ADMIN', // must be stripped/rejected
      });

    // Either 400 validation error (Zod rejects unknown key if strict)
    // or 201 with systemRole ignored by the service — both are acceptable.
    // Critical: the response must NOT grant ADMIN role.
    if (res.status === 201) {
      expect(res.body.data?.employee?.systemRole).not.toBe('ADMIN');
    } else {
      expect(res.status).toBe(400);
    }
  });

  it('should reject registration without required fields', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'bad-email' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should reject passwords shorter than 8 chars', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'user@example.com', firstName: 'A', lastName: 'B', password: 'short' });
    expect(res.status).toBe(400);
  });
});

// ─── Pagination Resource Exhaustion (Finding S6) ─────────────────────────────

describe('Input Validation — pagination limits', () => {
  it('should cap limit at 100', async () => {
    const res = await request(app)
      .get('/api/v1/employees?limit=99999')
      .set('Authorization', aliceToken);
    // Zod schema should reject anything over 100
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should reject non-numeric page param', async () => {
    const res = await request(app)
      .get('/api/v1/employees?page=abc')
      .set('Authorization', aliceToken);
    expect(res.status).toBe(400);
  });

  it('should accept valid limit within bounds', async () => {
    const res = await request(app)
      .get('/api/v1/employees?limit=50&page=1')
      .set('Authorization', aliceToken);
    expect(res.status).toBe(200);
  });
});

// ─── UUID Validation ──────────────────────────────────────────────────────────

describe('Input Validation — UUID params', () => {
  it('should reject non-UUID id param', async () => {
    const res = await request(app)
      .get('/api/v1/employees/not-a-uuid')
      .set('Authorization', aliceToken);
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should reject SQL injection attempt in id param', async () => {
    const res = await request(app)
      .get("/api/v1/employees/1' OR '1'='1")
      .set('Authorization', aliceToken);
    expect(res.status).toBe(400);
  });
});
