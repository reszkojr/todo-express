import 'dotenv/config';
import express from 'express';

const server = express();
const port = process.env.NODE_ENV === 'test' ? 0 : (process.env.PORT || 3000);

server.use(express.json());

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
	console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

export default server;