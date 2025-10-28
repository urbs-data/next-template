'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { testSchema } from './test-schema';

export const testAction = authActionClient
  .metadata({ actionName: 'testAction' })
  .inputSchema(testSchema)
  .action(async ({ parsedInput, ctx }) => {
    return {
      success: true,
      message: 'Test action successful'
    };
  });
