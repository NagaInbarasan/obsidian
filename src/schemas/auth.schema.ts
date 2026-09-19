import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    password: z.string().min(8, 'Password must be at least 8 characters').max(128),
    // systemRole intentionally OMITTED — users cannot self-assign roles (mass assignment protection)
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required').max(128)
  })
});
