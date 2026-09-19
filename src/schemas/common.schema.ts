import { z } from 'zod';

const MAX_LIMIT = 100;

export const paginationSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().default('1').transform(Number),
    // Cap limit at MAX_LIMIT to prevent resource exhaustion (finding S6)
    limit: z
      .string()
      .regex(/^\d+$/)
      .optional()
      .default('20')
      .transform(Number)
      .refine((n) => n <= MAX_LIMIT, { message: `limit cannot exceed ${MAX_LIMIT}` }),
  }),
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),
});
