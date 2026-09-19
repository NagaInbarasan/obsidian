import request from 'supertest';
import { describe, it, expect, vi } from 'vitest';
import app from '../src/app';

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      $connect() {}
      $disconnect() {}
    }
  };
});

describe('App & Health Check', () => {
  it('should return 200 OK for /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'OK' });
  });

  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
  });
});
