import { Request, Response } from 'express';
import { database } from '../db/db';
import { todoSchema } from '../db/schema/todo.schema';
import { eq, and } from 'drizzle-orm';

export const handleGetTodos = async (req: Request, res: Response): Promise<any> => {
	try {
		const userId = req.user?.id;

		const todos = await database.select().from(todoSchema).where(eq(todoSchema.userId, userId!));
		res.json(todos);
	} catch (err) {
		console.error('Error fetching todos:', err);
		res.status(500).send('Internal server error while fetching todos');
	}
};

export const handleGetTodoById = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params;
	const userId = req.user?.id;

	try {
		const todoItem = await database.select().from(todoSchema).where(and(eq(todoSchema.id, Number(id)), eq(todoSchema.userId, userId!)));
		if (todoItem.length === 0) {
			return res.status(404).send(`Todo with ID ${id} not found`);
		}
		res.json(todoItem[0]);
	} catch (err) {
		console.error(`Error fetching todo with ID ${id}:`, err);
		res.status(500).send(`Internal server error while fetching todo with ID ${id}`);
	}
};

export const handleCreateTodo = async (req: Request, res: Response): Promise<any> => {
	try {
		const userId = req.user?.id;
		const todo = req.body;

		if (todo.title == undefined || todo.description == undefined || todo.status == undefined) {
			return res.status(400).send('Title, description and status are required');
		}

		const newTodo = await database.insert(todoSchema).values({ ...todo, userId }).returning();
		res.status(201).json(newTodo[0]);
	} catch (err) {
		console.error('Error creating new todo:', err);
		res.status(500).send('Internal server error while creating new todo');
	}
};

export const handleUpdateTodo = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params;
	const userId = req.user?.id;

	try {
		const { title, description, status } = req.body;
		const updatedTodo = await database.update(todoSchema).set({ title, description, status }).where(and(eq(todoSchema.id, Number(id)), eq(todoSchema.userId, userId!)))
			.returning();
		if (updatedTodo.length === 0) {
			return res.status(404).send(`Todo with ID ${id} not found`);
		}
		res.json(updatedTodo[0]);
	} catch (err) {
		console.error(`Error updating todo with ID ${id}:`, err);
		res.status(500).send(`Internal server error while updating todo with ID ${id}`);
	}
};

export const handleDeleteTodo = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params;
	const userId = req.user?.id;

	try {
		const deletedTodo = await database.delete(todoSchema).where(and(eq(todoSchema.id, Number(id)), eq(todoSchema.userId, userId!))).returning();
		if (deletedTodo.length === 0) {
			return res.status(404).send(`Todo with ID ${id} not found`);
		}
		res.json(deletedTodo[0]);
	} catch (err) {
		console.error(`Error deleting todo with ID ${id}:`, err);
		res.status(500).send(`Internal server error while deleting todo with ID ${id}`);
	}
};
