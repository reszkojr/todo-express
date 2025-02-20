import request from 'supertest';
import app from '../app';

describe('User Routes', () => {
	let accessToken: string;
	let refreshToken: string;

	it('should register a new user', async () => {
		const res = await request(app).post('/api/register').send({
			username: 'testuser2',
			email: 'testuser2@example.com',
			password: 'password123',
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toEqual({
			id: 2,
			username: 'testuser2',
			email: 'testuser2@example.com',
		});
	});

	it('should login an existing user', async () => {
		const res = await request(app).post('/api/login').send({
			email: 'testuser2@example.com',
			password: 'password123',
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('accessToken');
		expect(res.body).toHaveProperty('refreshToken');

		refreshToken = res.body.refreshToken;
		accessToken = res.body.accessToken;
	});

	it('should reload the access token', async () => {
		const res = await request(app).post('/api/refresh-token').send({ refreshToken });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('accessToken');
	});
});
