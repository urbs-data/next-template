'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { addProductSchema } from './add-product-schema';

export const addProduct = authActionClient
  .metadata({ actionName: 'addProduct' })
  .inputSchema(addProductSchema)
  .action(async ({ parsedInput, ctx }) => {
    return {
      success: true,
      message: 'Add product successful'
    };
  });
