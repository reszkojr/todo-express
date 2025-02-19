import { Router } from 'express';
import { handleGetTodos, handleGetTodoById, handleCreateTodo, handleUpdateTodo, handleDeleteTodo } from '../controllers/todo.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.use('/todos', authenticateUser);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *             example:
 *               - id: 1
 *                 title: "Sample Todo"
 *                 description: "This is a sample todo"
 *                 status: "pending"
 *                 createdAt: "2025-02-19T12:34:56Z"
 *                 userId: 1
 */
router.get('/todos', handleGetTodos);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: A todo item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *             example:
 *               id: 1
 *               title: "Sample Todo"
 *               description: "This is a sample todo"
 *               status: "pending"
 *               createdAt: "2025-02-19T12:34:56Z"
 *               userId: 1
 *       404:
 *         description: Todo not found
 */
router.get('/todos/:id', handleGetTodoById);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *           example:
 *             title: "New Todo"
 *             description: "This is a new todo"
 *             status: "pending"
 *     responses:
 *       201:
 *         description: The created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *             example:
 *               id: 2
 *               title: "New Todo"
 *               description: "This is a new todo"
 *               status: "pending"
 *               createdAt: "2025-02-19T12:34:56Z"
 *               userId: 1
 */
router.post('/todos', handleCreateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *           example:
 *             title: "Updated Todo"
 *             description: "This is an updated todo"
 *             status: "in progress"
 *     responses:
 *       200:
 *         description: The updated todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *             example:
 *               id: 1
 *               title: "Updated Todo"
 *               description: "This is an updated todo"
 *               status: "in progress"
 *               createdAt: "2025-02-19T12:34:56Z"
 *               userId: 1
 *       404:
 *         description: Todo not found
 */
router.put('/todos/:id', handleUpdateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: The deleted todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *             example:
 *               id: 1
 *               title: "Sample Todo"
 *               description: "This is a sample todo"
 *               status: "pending"
 *               createdAt: "2025-02-19T12:34:56Z"
 *               userId: 1
 *       404:
 *         description: Todo not found
 */
router.delete('/todos/:id', handleDeleteTodo);

export default router;
