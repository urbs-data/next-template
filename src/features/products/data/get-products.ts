'use server';

import db from '@/db';
import { productsTable } from '@/db/schema';
import { getProductsSchema, GetProductsSchema } from './get-products-schema';
import { Product } from '../models/product';
import { ValidationError } from '@/lib/errors';
import { eq, like, and, or } from 'drizzle-orm';
import { getAuthContext } from '@/lib/context';

export async function getProducts(input: GetProductsSchema): Promise<{
  products: Product[];
  filteredCount: number;
  totalCount: number;
}> {
  const result = getProductsSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error));
  }
  const ctx = await getAuthContext();

  const parsedInput = result.data;
  const page = parsedInput.page || 1;
  const limit = parsedInput.limit || 10;
  const offset = (page - 1) * limit;

  // Build where conditions
  const conditions = [];

  if (parsedInput.search) {
    conditions.push(
      or(
        like(productsTable.name, `%${parsedInput.search}%`),
        like(productsTable.description, `%${parsedInput.search}%`),
        like(productsTable.category, `%${parsedInput.search}%`)
      )
    );
  }

  if (parsedInput.category) {
    const categories = parsedInput.category.split('.');
    if (categories.length > 0) {
      conditions.push(eq(productsTable.category, categories[0]));
    }
  }

  // Get filtered products with pagination
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const filteredProducts = await db
    .select()
    .from(productsTable)
    .where(and(whereClause, eq(productsTable.user_id, ctx.session.user.id)))
    .limit(limit)
    .offset(offset);

  // Get total count of filtered products
  const allFilteredProducts = await db
    .select()
    .from(productsTable)
    .where(and(whereClause, eq(productsTable.user_id, ctx.session.user.id)));

  const filteredCount = allFilteredProducts.length;

  // Get total count of all products
  const allProducts = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.user_id, ctx.session.user.id));
  const totalCount = allProducts.length;

  return {
    products: filteredProducts as Product[],
    filteredCount,
    totalCount
  };
}
