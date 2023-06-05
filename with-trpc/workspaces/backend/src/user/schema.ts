import { z } from 'zod';

export const findUserInput = z.object({
  email: z.string(),
});
export type FindUserInput = z.infer<typeof findUserInput>;

export const createUserInput = z.object({
  email: z.string(),
  name: z.string().optional(),
});
export type CreateUserInput = z.infer<typeof createUserInput>;
