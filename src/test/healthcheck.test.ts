import request from 'supertest';
import app from '../app';

describe('Healthcheck', () => {
	it('should return a 200 status code', async () => {
		const res = await request(app).get('/healthcheck');
		expect(res.statusCode).toEqual(200);
	});
});
