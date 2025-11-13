import * as z from 'zod';

export const disableInlandParameterSchema = z.object({
  id: z.number()
});

export type DisableInlandParameterSchema = z.infer<
  typeof disableInlandParameterSchema
>;
