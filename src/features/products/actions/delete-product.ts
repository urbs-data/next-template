'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { deleteProductSchema } from './delete-product-schema';
import db from '@/db';
import { productsTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteProduct = authActionClient
  .metadata({ actionName: 'deleteProduct' })
  .inputSchema(deleteProductSchema)
  .action(async ({ parsedInput, ctx }) => {
    const result = await db
      .delete(productsTable)
      .where(
        and(
          eq(productsTable.id, parsedInput.id),
          eq(productsTable.user_id, ctx.session.user.id)
        )
      );

    if (result.rowsAffected == 0) {
      return {
        success: false,
        message: 'Product not found'
      };
    }

    revalidatePath('/dashboard/product');

    return {
      success: true,
      message: 'Delete product successful'
    };
  });
