import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as userSchema from './schema/user.schema';
import * as todoSchema from './schema/todo.schema';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const schema = {
    ...userSchema,
    ...todoSchema,
};

export const database = drizzle(pool, { schema });