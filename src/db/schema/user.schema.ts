import { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, varchar, text } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('user', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: text('password').notNull(),
});

export type UserType = InferSelectModel<typeof userSchema>;