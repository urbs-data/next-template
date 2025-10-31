import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// createClient() crea el cliente con la URL de la base.
const client = createClient({ url: process.env.DATABASE_URL! });

// drizzle({ client }) inicializa la conexión que luego se usa en todo el proyecto.
const db = drizzle({ client });

export default db;
