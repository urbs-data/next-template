'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { addProductSchema } from './add-product-schema';
import db from '@/db';
import { productsTable } from '@/db/schema';

export const addProduct = authActionClient
  .metadata({ actionName: 'addProduct' })
  .inputSchema(addProductSchema)
  .action(async ({ parsedInput, ctx }) => {
    const now = new Date().toISOString();

    // Use a simple hash of the name and timestamp to generate a unique photo URL
    const photoId =
      Math.abs(
        parsedInput.name.split('').reduce((hash, char) => {
          return (hash << 5) - hash + char.charCodeAt(0);
        }, 0)
      ) % 20;

    const photo_url = `https://api.slingacademy.com/public/sample-products/${photoId}.png`;

    const result = await db
      .insert(productsTable)
      .values({
        user_id: ctx.session.user.id,
        name: parsedInput.name,
        category: parsedInput.category,
        price: parsedInput.price,
        description: parsedInput.description,
        photo_url,
        created_at: now,
        updated_at: now
      })
      .returning();

    return {
      success: true,
      message: 'Add product successful',
      data: result
    };
  });
