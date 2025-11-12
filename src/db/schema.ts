import {
  pgTable,
  serial,
  text,
  real,
  timestamp,
  unique
} from 'drizzle-orm/pg-core';

export const productsTable = pgTable(
  'products_table',
  {
    id: serial('id').primaryKey(),
    user_id: text('user_id').notNull(),
    photo_url: text('photo_url').notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    price: real('price').notNull(),
    category: text('category').notNull(),
    updated_at: timestamp('updated_at').notNull().defaultNow()
  },
  (table) => [unique('name_user_idx').on(table.name, table.user_id)]
);

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;
