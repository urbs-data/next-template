'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { disableInlandParameterSchema } from './disable-inland-parameter-schema';
import db from '@/db';
import { inlandParametersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ValidationError } from '@/lib/errors';

export const disableInlandParameter = authActionClient
  .metadata({ actionName: 'disableInlandParameter' })
  .inputSchema(disableInlandParameterSchema)
  .action(async ({ parsedInput, ctx }) => {
    const now = new Date().toISOString();

    const userEmail = ctx.session?.user?.email;
    if (!userEmail) {
      throw new ValidationError('User is not authenticated.');
    }

    const result = await db
      .update(inlandParametersTable)
      .set({
        end_date: now,
        user: userEmail
      })
      .where(eq(inlandParametersTable.id, parsedInput.id));

    if (result.rowsAffected === 0) {
      throw new ValidationError('Inland Parameter not found or not updated.');
    }

    revalidatePath('/dashboard/parameters/inland_parameter');

    return {
      message: 'Inland Parameter successfully disabled.'
    };
  });
