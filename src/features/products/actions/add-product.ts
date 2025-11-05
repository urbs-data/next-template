'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { addProductSchema } from './add-product-schema';
import db from '@/db';
import { productsTable } from '@/db/schema';
import { generatePhotoUrl } from '../lib/products';
import { revalidatePath } from 'next/cache';

export const addProduct = authActionClient
  .metadata({ actionName: 'addProduct' })
  .inputSchema(addProductSchema)
  .action(async ({ parsedInput, ctx }) => {
    const now = new Date().toISOString();
    const productData = {
      user_id: ctx.session.user.id,
      name: parsedInput.name,
      category: parsedInput.category,
      price: parsedInput.price,
      description: parsedInput.description,
      photo_url: generatePhotoUrl(parsedInput.name),
      created_at: now,
      updated_at: now
    };

    await db.insert(productsTable).values(productData);

    revalidatePath('/dashboard/product');

    return {
      message: 'Add product successful'
    };
  });
