import { z } from 'zod';

export const addInlandParameterSchema = z.object({
  inland_type: z.string().min(1),
  port: z.string().min(1),
  country: z.string().min(1),
  zip_code: z.number(),
  value: z.number(),
  cost_group: z.string().min(1)
});

export type AddInlandParameterSchema = z.infer<typeof addInlandParameterSchema>;

/* import * as z from 'zod';

export const addInlandParameterSchema = z.object({
  id: z.number().min(1, { message: 'Inland Parameter ID is required.' }),
  inland_type: z.string(),
  port: z.string(),
  country: z.string(),
  start_date: z.string(),
  end_date: z.date(),
  zip_code: z.number(),
  value: z.number(),
  cost_group: z.string(), // posible dropdown
  /* user: z.string()
});
export type AddInlandParameterSchema = z.infer<typeof addInlandParameterSchema>; */
