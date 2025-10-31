import { int, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

// Define el esquema de una tabla de la BDD, en este caso representa la de productos

export const productsTable = sqliteTable('products_table', {
  id: int().primaryKey({ autoIncrement: true }),
  user_id: text().notNull(),
  photo_url: text().notNull(),
  name: text().notNull(),
  description: text().notNull(),
  created_at: text().notNull(),
  price: real().notNull(),
  category: text().notNull(),
  updated_at: text().notNull()
});
