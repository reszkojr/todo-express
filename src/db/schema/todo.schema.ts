import { InferSelectModel } from 'drizzle-orm';
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userSchema } from './user.schema';

export const statusEnums = pgEnum('status', ['pending', 'in progress', 'completed']);

export const todoSchema = pgTable('todo', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	status: statusEnums().default('pending').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
    userId: integer('user_id').references(() => userSchema.id).notNull(),
});

export type TodoType = InferSelectModel<typeof todoSchema>;