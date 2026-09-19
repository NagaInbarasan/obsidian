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

import app from '../src/app';
import { AuthService } from '../src/services/auth.service';

vi.mock('../src/services/auth.service', () => ({
  AuthService: {
    register: vi.fn().mockResolvedValue({
      employee: { id: 'uuid-1', email: 'test@example.com' },
      token: 'fake-jwt-token'
    }),
    login: vi.fn().mockResolvedValue({
      employee: { id: 'uuid-1', email: 'test@example.com' },
      token: 'fake-jwt-token'
    })
  }
}));

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'securepassword123'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBe('fake-jwt-token');
  });

  it('should validate registration fields', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'invalid-email'
      });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'securepassword123'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBe('fake-jwt-token');
  });

  it('should get current user profile via /me', async () => {
    const token = jwt.sign({ id: 'uuid-1', role: 'EMPLOYEE', email: 'test@example.com' }, config.jwtSecret);
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('test@example.com');
  });
});
