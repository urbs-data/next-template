import * as z from 'zod';

export const getHTSCodesSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional()
});

export type GetHTSCodesSchema = z.infer<typeof getHTSCodesSchema>;
// atento al codes en plural
