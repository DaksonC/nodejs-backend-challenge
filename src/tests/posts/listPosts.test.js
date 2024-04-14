require('dotenv').config();
const request = require('supertest');
const { app, server } = require('../../app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

describe('GET /api/posts', () => {
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

  it('should list user posts successfully', async () => {
    const postData = [
      { title: 'Post 1', body: 'Body of Post 1', authorId: testUser.id },
      { title: 'Post 2', body: 'Body of Post 2', authorId: testUser.id },
    ];
    await prisma.post.createMany({ data: postData });

    const response = await request(app)
      .get(`/api/posts?userId=${testUser.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(postData.length);

    postData.forEach((post, index) => {
      expect(response.body[index]).toMatchObject({
        title: post.title,
        body: post.body,
        authorId: post.authorId,
      });
    });
  });
});



