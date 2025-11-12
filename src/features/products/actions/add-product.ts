'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { addProductSchema } from './add-product-schema';
import db from '@/db';
import { productsTable } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { createProductData } from '../lib/product-factory';

export const addProduct = authActionClient
  .metadata({ actionName: 'addProduct' })
  .inputSchema(addProductSchema)
  .action(async ({ parsedInput, ctx }) => {
    const productData = createProductData(
      {
        name: parsedInput.name,
        category: parsedInput.category,
        price: parsedInput.price,
        description: parsedInput.description
      },
      ctx.session.user.id
    );

    await db.insert(productsTable).values(productData);

    revalidatePath('/dashboard/product');

    return {
      message: 'Add product successful'
    };
  });
