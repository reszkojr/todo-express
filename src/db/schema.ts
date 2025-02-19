import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const todoSchema = pgTable('todo', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	done: boolean('completed').default(false).notNull(),
	dueDate: timestamp('due_date'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
