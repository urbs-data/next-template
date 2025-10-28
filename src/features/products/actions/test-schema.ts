import * as z from 'zod';

export const testSchema = z.object({
  name: z.string().min(1)
});

export type TestSchema = z.infer<typeof testSchema>;
