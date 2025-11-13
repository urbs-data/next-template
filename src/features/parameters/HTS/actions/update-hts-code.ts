'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { updateHTSCodeSchema } from './update-hts-code-schema';
import db from '@/db';
import { htsCodesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const updateHTSCode = authActionClient
  .metadata({ actionName: 'updateHTSCode' })
  .inputSchema(updateHTSCodeSchema)
  .action(async ({ parsedInput }) => {
    await db
      .update(htsCodesTable)
      .set({
        // no se puede modificar el hts
        hts_category: parsedInput.hts_category,
        min_value: parsedInput.min_value,
        max_value: parsedInput.max_value,
        type: parsedInput.type,
        duty: parsedInput.duty,
        cost_group: parsedInput.cost_group,
        hts_product_subtype: parsedInput.hts_product_subtype,
        fixed_duty_per_piece: parsedInput.fixed_duty_per_piece,
        notes: parsedInput.notes
      })
      .where(eq(htsCodesTable.hts_code, parsedInput.hts_code));

    revalidatePath('/dashboard/parameters/HTS');

    return {
      message: 'HTS Code updated successfully'
    };
  });
