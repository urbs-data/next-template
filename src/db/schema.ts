import { int, sqliteTable, text, real, unique } from 'drizzle-orm/sqlite-core';

export const productsTable = sqliteTable(
  'products_table',
  {
    id: int().primaryKey({ autoIncrement: true }),
    user_id: text().notNull(),
    photo_url: text().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    created_at: text().notNull(),
    price: real().notNull(),
    category: text().notNull(),
    updated_at: text().notNull()
  },
  (table) => [unique('name_user_idx').on(table.name, table.user_id)]
);

export const htsCodesTable = sqliteTable('hts_codes', {
  hts_code: text().primaryKey(),

  // ATENTO A ESTO -> Que hacemos con este campo?
  user_id: text(),

  hts_category: text(),
  min_value: real(),
  max_value: real(),
  type: text(),
  duty: real(),
  cost_group: text(),
  hts_product_subtype: text(),
  fixed_duty_per_piece: real(),
  notes: text()
});

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;

export type HTSCode = typeof htsCodesTable.$inferSelect;
export type NewHTSCode = typeof htsCodesTable.$inferInsert;
