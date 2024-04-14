require('dotenv').config();
const request = require('supertest');
const { app, server } = require('../../app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

describe('GET /api/posts/:id', () => {
  let testUser;
  let authToken;
  let testPostId;

  beforeAll(async () => {
    testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    });

    const postData = { title: 'Test Post', body: 'This is a test post', authorId: testUser.id };
    const createdPost = await prisma.post.create({ data: postData });
    testPostId = createdPost.id;

    authToken = jwt.sign({ id: testUser.id }, process.env.SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await server.close();
  });

  it('should get user post successfully', async () => {
    const response = await request(app)
      .get(`/api/posts/${testPostId}?userId=${testUser.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', testPostId);
    expect(response.body).toHaveProperty('title', 'Test Post');
    expect(response.body).toHaveProperty('body', 'This is a test post');
    expect(response.body).toHaveProperty('authorId', testUser.id);
  });

  it('should return 404 for non-existent post', async () => {
    const nonExistentId = 'non-existent-id';
    const response = await request(app)
      .get(`/api/posts/${nonExistentId}?userId=${testUser.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'Post not found');
  });

  it('should return 404 for post not belonging to user', async () => {
    const differentUserId = 'different-user-id';
    const response = await request(app)
      .get(`/api/posts/${testPostId}?userId=${differentUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'User not found');
  });
});

