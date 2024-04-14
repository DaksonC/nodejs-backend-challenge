require('dotenv').config();
const jwt = require('jsonwebtoken');
const request = require('supertest');
const { app, server } = require('../../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('POST /api/posts', () => {
  let testUser;
  let authToken;

  beforeAll(async () => {
    testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    });

    authToken = jwt.sign({ id: testUser.id }, process.env.SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: testUser.id } });
    await prisma.$disconnect();
    await server.close();
  });

  it('should create a new post successfully', async () => {
    const postData = {
      title: 'Test Post',
      body: 'This is a test post',
      tags: ['test', 'post'],
      authorId: testUser.id,
    };

    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send(postData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(postData.title);
    expect(response.body.body).toBe(postData.body);
    expect(Array.isArray(response.body.tags)).toBe(true);
    expect(response.body.tags).toContain(...postData.tags);
  });
});
