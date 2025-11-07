'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { bulkAddProductsSchema } from './bulk-add-products-schema';
import db from '@/db';
import { productsTable } from '@/db/schema';
import * as XLSX from 'xlsx';
import { generatePhotoUrl } from '../lib/products';
import { sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

interface ExcelRow {
  name: string;
  category: string;
  price: number;
  description: string;
}

export const bulkAddProducts = authActionClient
  .metadata({ actionName: 'bulkAddProducts' })
  .inputSchema(bulkAddProductsSchema)
  .action(async ({ parsedInput, ctx }) => {
    const file = Array.isArray(parsedInput.excel)
      ? parsedInput.excel[0]
      : parsedInput.excel;
    if (!file) {
      throw new Error('No se recibió ningún archivo Excel.');
    }
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

    const requiredColumns = ['name', 'category', 'price', 'description'];
    const firstRow = data[0];
    const missingColumns = requiredColumns.filter((col) => !(col in firstRow));

    if (missingColumns.length > 0) {
      throw new Error(
        `Faltan las siguientes columnas en el Excel: ${missingColumns.join(', ')}`
      );
    }

    const productsToInsert = data.map((row) => {
      const now = new Date().toISOString();
      const photo_url = generatePhotoUrl(row.name);
      return {
        user_id: ctx.session.user.id,
        name: row.name,
        category: row.category,
        price: row.price,
        description: row.description,
        photo_url: photo_url,
        created_at: now,
        updated_at: now
      };
    });

    const result = await db
      .insert(productsTable)
      .values(productsToInsert)
      .onConflictDoUpdate({
        target: [productsTable.name, productsTable.user_id],
        set: {
          category: sql`excluded.category`,
          price: sql`excluded.price`,
          description: sql`excluded.description`,
          photo_url: sql`excluded.photo_url`,
          updated_at: sql`excluded.updated_at`
        }
      })
      .returning();

    revalidatePath('/dashboard/product');

    return {
      message: `${result.length} producto(s) agregados exitosamente`
    };
  });
