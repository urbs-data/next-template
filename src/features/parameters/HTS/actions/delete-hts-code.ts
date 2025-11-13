'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { deleteHTSCodeSchema } from './delete-hts-code-schema';
import db from '@/db';
import { htsCodesTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ValidationError } from '@/lib/errors';

export const deleteHTSCode = authActionClient
  .metadata({ actionName: 'deleteHTSCode' })
  .inputSchema(deleteHTSCodeSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await db
      .delete(htsCodesTable)
      .where(
        and(
          eq(htsCodesTable.hts_code, parsedInput.hts_code),
          eq(htsCodesTable.user_id, ctx.session.user.id)
        )
      );

    if (result.rowsAffected == 0) {
      throw new ValidationError('HTS Code was not deleted');
    }

    revalidatePath('/dashboard/parameters/HTS');

    return {
      message: 'Delete HTS Code successful'
    };
  });
