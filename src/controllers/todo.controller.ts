import { Request, Response } from 'express';
import { database } from '../db/db';
import { todoSchema } from '../db/schema';
import { eq } from 'drizzle-orm';

export const getTodos = async (req: Request, res: Response): Promise<any> => {
	try {
		const todos = await database.select().from(todoSchema);
		res.json(todos);
	} catch (err) {
		console.error('Error fetching todos:', err);
		res.status(500).send('Internal server error while fetching todos');
	}
};

export const getTodoById = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params;
	try {
		const todoItem = await database
			.select()
			.from(todoSchema)
			.where(eq(todoSchema.id, Number(id)));
		if (todoItem.length === 0) {
			return res.status(404).send(`Todo with ID ${id} not found`);
		}
		res.json(todoItem[0]);
	} catch (err) {
		console.error(`Error fetching todo with ID ${id}:`, err);
		res.status(500).send(`Internal server error while fetching todo with ID ${id}`);
	}
};

export const createTodo = async (req: Request, res: Response): Promise<any> => {
	try {
		const { title, description, status } = req.body;
		const newTodo = await database.insert(todoSchema).values({ title, description, status }).returning();
		res.status(201).json(newTodo[0]);
	} catch (err) {
		console.error('Error creating new todo:', err);
		res.status(500).send('Internal server error while creating new todo');
	}
};

export const updateTodo = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params;
	try {
		const { title, description, status } = req.body;
		const updatedTodo = await database
			.update(todoSchema)
			.set({ title, description, status })
			.where(eq(todoSchema.id, Number(id)))
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

export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params;
	try {
		const deletedTodo = await database
			.delete(todoSchema)
			.where(eq(todoSchema.id, Number(id)))
			.returning();
		if (deletedTodo.length === 0) {
			return res.status(404).send(`Todo with ID ${id} not found`);
		}
		res.json(deletedTodo[0]);
	} catch (err) {
		console.error(`Error deleting todo with ID ${id}:`, err);
		res.status(500).send(`Internal server error while deleting todo with ID ${id}`);
	}
};
