require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const mongoUri = process.env.TEST_MONGODB_URI;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
}, 60000);

beforeEach(async () => {
  await Blog.deleteMany({});
}, 60000);

test('a valid blog post is saved to the database', async () => {
  const testBlog = {
    title: 'Test Blog',
    author: 'Tester',
    url: 'http://testurl.com',
    likes: 0,
  };

  const response = await api.post('/api/blogs').send(testBlog).expect(201);
  expect(response.body.title).toBe('Test Blog');

  const blogs = await Blog.find({});
  expect(blogs).toHaveLength(1);
  expect(blogs[0].title).toBe('Test Blog');
}, 60000);

afterAll(async () => {
  await mongoose.connection.close();
}, 60000);
