import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import employeeRoutes from './routes/employee.routes';
import roleRoutes from './routes/role.routes';
import skillRoutes from './routes/skill.routes';
import learningRoutes from './routes/learning.routes';
import authRoutes from './routes/auth.routes';
import hrRoutes from './routes/hr.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// --- Security Headers ---
app.use(helmet());

// --- CORS ---
// In production, configure ALLOWED_ORIGINS env var to restrict to known frontends
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : undefined; // undefined = allow all in development

app.use(cors(allowedOrigins ? { origin: allowedOrigins } : undefined));

// --- Request Body Size Limit (finding S5) ---
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

// --- Rate Limiting ---
// Slightly relaxed for test environment to avoid flakiness, but always enabled
const isTest = process.env.NODE_ENV === 'test';

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isTest ? 10_000 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests, please try again later.' } }
});

// Stricter rate limit on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTest ? 10_000 : 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many auth attempts, please try again later.' } }
});

app.use(globalLimiter);

// --- Routes ---
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/skills', skillRoutes);
app.use('/api/v1/learning-resources', learningRoutes);
app.use('/api/v1/hr', hrRoutes);

// --- Health Check (public) ---
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

// --- Centralized Error Handler ---
app.use(errorHandler);

export default app;
