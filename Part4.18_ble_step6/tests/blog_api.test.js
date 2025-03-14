// tests/blog_api.test.js
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

test('successfully updates the number of likes', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Author',
    url: 'http://test.com',
    likes: 0,
  };

  // Create a blog first
  const createdBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const updatedBlogData = {
    likes: 10,
  };

  const response = await api
    .put(`/api/blogs/${createdBlog.body.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBe(10);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close(); // Close the server after all tests
});
