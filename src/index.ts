import 'dotenv/config';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import todoRoutes from './routes/todo.routes';
import userRoutes from './routes/user.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger set up
const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Todo API',
			version: '1.0.0',
			description: 'API documentation for the Todo application',
		},
		servers: [
			{
				url: `http://localhost:${port}/api`,
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
			schemas: {
				Todo: {
					type: 'object',
					properties: {
						id: {
							type: 'integer',
							description: 'The auto-generated id of the todo',
						},
						title: {
							type: 'string',
							description: 'The title of the todo',
						},
						description: {
							type: 'string',
							description: 'The description of the todo',
						},
						status: {
							type: 'string',
							description: 'The status of the todo',
						},
						createdAt: {
							type: 'string',
							format: 'date-time',
							description: 'The date and time when the todo was created',
						},
						userId: {
							type: 'integer',
							description: 'The id of the user who created the todo',
						},
					},
					example: {
						id: 1,
						title: 'Sample Todo',
						description: 'This is a sample todo',
						status: 'pending',
						createdAt: '2025-02-19T12:34:56Z',
						userId: 1,
					},
				},
				User: {
					type: 'object',
					properties: {
						id: {
							type: 'integer',
							description: 'The auto-generated id of the user',
						},
						username: {
							type: 'string',
							description: 'The username of the user',
						},
						email: {
							type: 'string',
							description: 'The email of the user',
						},
						password: {
							type: 'string',
							description: 'The password of the user',
						},
					},
					example: {
						id: 1,
						username: 'sampleuser',
						email: 'sampleuser@example.com',
						password: 'password123',
					},
				},
			},
		},
	},
	apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', todoRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
	console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
