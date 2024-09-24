const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  // Add any initial test data if needed
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog Title',
    author: 'Author Name',
    url: 'http://example.com',
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(1); // Adjust this based on how many blogs should exist
});

afterAll(async () => {
  await mongoose.connection.close(); // Ensure connection is closed after tests
});
