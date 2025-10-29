'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { updateProductSchema } from './update-product-schema';
import db from '@/db';
import { productsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const updateProduct = authActionClient
  .metadata({ actionName: 'updateProduct' })
  .inputSchema(updateProductSchema)
  .action(async ({ parsedInput }) => {
    const now = new Date().toISOString();

    // Use existing photo_url if image is not provided
    let photo_url: string | undefined;

    if (parsedInput.image && parsedInput.image.length > 0) {
      // Use a simple hash of the name and timestamp to generate a unique photo URL
      const photoId =
        Math.abs(
          parsedInput.name.split('').reduce((hash, char) => {
            return (hash << 5) - hash + char.charCodeAt(0);
          }, 0)
        ) % 20;

      photo_url = `https://api.slingacademy.com/public/sample-products/${photoId}.png`;
    }

    const updateData: any = {
      name: parsedInput.name,
      category: parsedInput.category,
      price: parsedInput.price,
      description: parsedInput.description,
      updated_at: now
    };

    if (photo_url) {
      updateData.photo_url = photo_url;
    }

    const result = await db
      .update(productsTable)
      .set(updateData)
      .where(eq(productsTable.id, parsedInput.id))
      .returning();

    return {
      success: true,
      message: 'Product updated successfully',
      data: result
    };
  });
