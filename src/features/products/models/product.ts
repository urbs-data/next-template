import * as z from 'zod';

export const productSchema = z.object({
  photo_url: z.string(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  price: z.number(),
  id: z.number(),
  category: z.string(),
  updated_at: z.string()
});

export type Product = z.infer<typeof productSchema>;
