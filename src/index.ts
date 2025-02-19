import 'dotenv/config';
import express from 'express';
import todoRoutes from './routes/todo.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', todoRoutes);

app.listen(port, async () => {
	console.log(`Server running on port ${port}`);
});
