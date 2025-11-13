import * as z from 'zod';

export const getInlandParametersSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional()
});

export type GetInlandParametersSchema = z.infer<
  typeof getInlandParametersSchema
>;
