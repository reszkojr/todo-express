import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

const databaseUrl = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/db/schema/*.ts',
	out: './drizzle',
	dbCredentials: {
		url: databaseUrl!,
	},
});
