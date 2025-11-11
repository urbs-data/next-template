'use server';

import { getAreasSchema, GetAreasSchema } from './get-areas-schema';
import { ValidationError } from '@/lib/errors';
import { delay } from '@/constants/mock-api';
import { AREAS } from './constants';

export interface Area {
  id: string;
  label: string;
}

export async function getAreas(input: GetAreasSchema = {}): Promise<Area[]> {
  const result = getAreasSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error));
  }

  await delay(800);

  return AREAS;
}
