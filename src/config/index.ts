import dotenv from 'dotenv';
dotenv.config();

// Hard fail in production if JWT_SECRET is not explicitly set
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable must be set in production');
}

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  // Falls back to dev-only string; production guard above prevents this from being used silently
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-for-development-only',
};
