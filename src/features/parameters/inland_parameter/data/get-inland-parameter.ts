'use server';

import db from '@/db';
import { InlandParameter, inlandParametersTable } from '@/db/schema';
/* import { GetInlandParametersSchema, getInlandParametersSchema } from './get-inland-parameter-schema'; */
/* import { ValidationError } from '@/lib/errors'; */
import { /* eq, like, and, or, asc, desc, SQL, */ count } from 'drizzle-orm';
/* import { getAuthContext } from '@/lib/context'; */

export async function getInlandParameters(/* input: GetHTSCodesSchema */): Promise<{
  inland_parameters: InlandParameter[];
  totalCount: number;
}> {
  /* const result = getHTSCodesSchema.safeParse(input); */

  /* if (!result.success) {
        throw new ValidationError(JSON.stringify(result.error));
    } */

  /* const ctx = await getAuthContext(); */

  /* const parsedInput = result.data;
    const page = parsedInput.page || 1;
    const limit = parsedInput.limit || 10;
    const offset = (page - 1) * limit; */

  /* Posible input de busqueda... */

  /* const conditions = [];
    
    if (parsedInput.search) {

            conditions.push(
            or(
                like(productsTable.name, `%${parsedInput.search}%`),
                like(productsTable.description, `%${parsedInput.search}%`),
                like(productsTable.category, `%${parsedInput.search}%`)
            )
        );
    } */

  /* if (parsedInput.category) {
        const categories = parsedInput.category.split(',').filter(Boolean);
        if (categories.length > 0) {
        conditions.push(
            or(...categories.map((cat) => eq(productsTable.category, cat.trim())))
        );
        }
    } */

  /* const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

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
    } */

  const filteredInlandParametersCodes = await db
    .select()
    .from(inlandParametersTable);
  /* .where(and(whereClause, eq(productsTable.user_id, ctx.session.user.id)))
            .orderBy(
            ...(orderByClause.length > 0 ? orderByClause : [asc(productsTable.id)])
            ) */
  /* .limit(limit)
            .offset(offset); */

  const [{ count: totalCount }] = await db
    .select({ count: count() })
    .from(inlandParametersTable);
  /* .where(and(whereClause, eq(productsTable.user_id, ctx.session.user.id))); */

  return {
    inland_parameters: filteredInlandParametersCodes as InlandParameter[],
    totalCount
  };
}
