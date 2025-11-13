'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { addInlandParameterSchema } from './add-inland_parameter-schema';
import db from '@/db';
import { inlandParametersTable } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { createInlandParameterData } from '../lib/inland-factory';

export const addInlandParameter = authActionClient
  .metadata({ actionName: 'addInlandParameter' })
  .inputSchema(addInlandParameterSchema)
  .action(async ({ parsedInput, ctx }) => {
    const inlandParameterData = createInlandParameterData(
      parsedInput,
      ctx.session.user.email
    );

    await db.insert(inlandParametersTable).values(inlandParameterData);

    revalidatePath('/dashboard/inland_parameter');

    return {
      message: 'Inland Parameter added successfully.'
    };
  });
