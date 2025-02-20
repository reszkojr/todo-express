import 'dotenv/config';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const port = process.env.NODE_ENV === 'test' ? 0 : (process.env.PORT || 3000);

server.use(express.json());

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
	console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

export default server;