import { Router } from 'express';
import { handleRegisterUser } from '../controllers/user.controller';

const router = Router();

router.post('/register', handleRegisterUser);

export default router;
