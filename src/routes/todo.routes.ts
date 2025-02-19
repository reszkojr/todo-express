import { Router } from 'express';
import { handleGetTodos, handleGetTodoById, handleCreateTodo, handleUpdateTodo, handleDeleteTodo } from '../controllers/todo.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.use('/todos', authenticateUser);

router.get('/todos', handleGetTodos);
router.get('/todos/:id', handleGetTodoById);
router.post('/todos', handleCreateTodo);
router.put('/todos/:id', handleUpdateTodo);
router.delete('/todos/:id', handleDeleteTodo);

export default router;
