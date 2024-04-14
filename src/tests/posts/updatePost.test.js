require('dotenv').config();
const request = require('supertest');
const { app, server } = require('../../app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

describe('PUT /api/posts/:id', () => {
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

  it('should update user post successfully', async () => {
    const updatedData = { title: 'Updated Post', body: 'This is an updated post', tags: ['update', 'test'] };

    const response = await request(app)
      .put(`/api/posts/${testPostId}?userId=${testUser.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('id', testPostId);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.body).toBe(updatedData.body);
    expect(response.body.tags).toEqual(expect.arrayContaining(updatedData.tags));
  });
});
