import 'dotenv/config';
import express from 'express';
import todoRoutes from './routes/todo.routes';
import userRoutes from './routes/user.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', todoRoutes);
app.use('/api', userRoutes);

app.listen(port, async () => {
	console.log(`Server running on port ${port}`);
});
