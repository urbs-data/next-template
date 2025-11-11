'use server';

import db from '@/db';
import { productsTable } from '@/db/schema';
import { getProductsSchema, GetProductsSchema } from './get-products-schema';
import { Product } from '@/db/schema';
import { ValidationError } from '@/lib/errors';
import { eq, like, and, or, asc, desc, SQL } from 'drizzle-orm';
import { getAuthContext } from '@/lib/context';
import { delay } from '@/constants/mock-api';

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
    const categories = parsedInput.category.split(',').filter(Boolean);
    if (categories.length > 0) {
      conditions.push(
        or(...categories.map((cat) => eq(productsTable.category, cat.trim())))
      );
    }
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const orderByClause: SQL[] = [];
  if (parsedInput.sortBy) {
    const columnMap: Record<string, any> = {
      id: productsTable.id,
      name: productsTable.name,
      description: productsTable.description,
      price: productsTable.price,
      category: productsTable.category,
      created_at: productsTable.created_at,
      updated_at: productsTable.updated_at,
      photo_url: productsTable.photo_url
    };

    const column = columnMap[parsedInput.sortBy];
    if (column) {
      const isDesc = parsedInput.sortDirection === 'desc';
      orderByClause.push(isDesc ? desc(column) : asc(column));
    }
  }

  const filteredProducts = await db
    .select()
    .from(productsTable)
    .where(and(whereClause, eq(productsTable.user_id, ctx.session.user.id)))
    .orderBy(
      ...(orderByClause.length > 0 ? orderByClause : [asc(productsTable.id)])
    )
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

  await delay(1000);

  return {
    products: filteredProducts as Product[],
    filteredCount,
    totalCount
  };
}
