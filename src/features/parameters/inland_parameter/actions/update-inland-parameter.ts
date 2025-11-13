'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { updateInlandParameterSchema } from './update-inland-parameter-schema';
import db from '@/db';
import { inlandParametersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ValidationError } from '@/lib/errors';

export const updateInlandParameter = authActionClient
  .metadata({ actionName: 'updateInlandParameter' })
  .inputSchema(updateInlandParameterSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, inland_type, port, country, zip_code, value, cost_group } =
      parsedInput;
    const userEmail = ctx.session?.user?.email;

    if (!userEmail) {
      throw new ValidationError('User not authenticated');
    }

    const result = await db
      .update(inlandParametersTable)
      .set({
        inland_type,
        port,
        country,
        zip_code,
        value,
        cost_group,
        user: userEmail // sobrescribimos el ult user que tocó algo
      })
      .where(eq(inlandParametersTable.id, id));

    if (result.rowsAffected === 0) {
      throw new ValidationError('Inland parameter not found or not updated');
    }

    revalidatePath('/dashboard/parameters/inland_parameters');

    return {
      message: 'Inland parameter updated successfully'
    };
  });
