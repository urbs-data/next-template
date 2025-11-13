'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { addHTSCodeSchema } from './add-hts-code-schema';
import db from '@/db';
import { htsCodesTable } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { createHTSCodeData } from '../lib/hts-factory';

export const addHTSCode = authActionClient
  .metadata({ actionName: 'addHTSCode' })
  .inputSchema(addHTSCodeSchema)
  .action(async ({ parsedInput, ctx }) => {
    const htsData = createHTSCodeData(parsedInput, ctx.session.user.id);

    await db.insert(htsCodesTable).values(htsData);

    revalidatePath('/dashboard/HTS');

    return {
      message: 'HTS Code added successfully.'
    };
  });
