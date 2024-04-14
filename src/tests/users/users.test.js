const request = require('supertest');
const { app, server } = require('../../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('POST /api/users', () => {
  let createdUserId;

  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    if (createdUserId) {
      await prisma.user.delete({ where: { id: createdUserId } });
      }
      await prisma.$disconnect();
      await server.close();
  });

  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', userData.name);
    expect(response.body).toHaveProperty('email', userData.email);
    expect(response.body).not.toHaveProperty('password');

    createdUserId = response.body.id;

    const user = await prisma.user.findUnique({
      where: { id: createdUserId },
    });

    expect(user).toBeTruthy();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });
});
