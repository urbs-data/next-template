import * as z from 'zod';

export const getProductsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
  category: z.string().optional()
});

export type GetProductsSchema = z.infer<typeof getProductsSchema>;
