// tests/for_testing.test.js
require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require('supertest');
const { app, server } = require('../app'); // Updated to import server
const Blog = require('../models/blog');

const api = supertest(app);

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) { // 0 means disconnected
  await mongoose.connect(process.env.TEST_MONGODB_URI);
}}, 60000);

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

  const response = await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.title).toBe('Test Blog');

  const blogs = await Blog.find({});
  expect(blogs).toHaveLength(1);
  expect(blogs[0].title).toBe('Test Blog');
}, 60000);

afterAll(async () => {
  await mongoose.connection.close();
  await server.close(); // Close the server after all tests
});
