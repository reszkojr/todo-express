import request from 'supertest';
import app from '../app';

describe('Todo Routes', () => {
    let token: string;

    beforeAll(async () => {
        await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123'
            });

        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });

        token = response.body.accessToken;
    });

    it('should create a new todo', async () => {
        const response = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'New Todo',
                description: 'This is a new todo',
                status: 'pending'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('New Todo');
    });

    it('should get all todos', async () => {
        const response = await request(app)
            .get('/api/todos')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should get a todo by ID', async () => {
        const newTodo = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Another Todo',
                description: 'This is another todo',
                status: 'pending'
            });

        const response = await request(app)
            .get(`/api/todos/${newTodo.body.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Another Todo');
    });

    it('should update a todo by ID', async () => {
        const newTodo = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Todo to Update',
                description: 'This todo will be updated',
                status: 'pending'
            });

        const response = await request(app)
            .put(`/api/todos/${newTodo.body.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Todo',
                description: 'This is an updated todo',
                status: 'in progress'
            });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Todo');
    });

    it('should delete a todo by ID', async () => {
        const newTodo = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Todo to Delete',
                description: 'This todo will be deleted',
                status: 'pending'
            });
        
            console.log(token)

        const response = await request(app)
            .delete(`/api/todos/${newTodo.body.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
});