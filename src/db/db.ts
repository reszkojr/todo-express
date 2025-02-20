import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as userSchema from './schema/user.schema';
import * as todoSchema from './schema/todo.schema';

const connectionString = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;

const pool = new Pool({
	connectionString,
});

const schema = {
    ...userSchema,
    ...todoSchema,
};

export const database = drizzle(pool, { schema });