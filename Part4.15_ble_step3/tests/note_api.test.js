// tests/note_api.test.js
require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeAll(async () => {
  const mongoUri = process.env.TEST_MONGODB_URI;
  if (!mongoUri) {
    throw new Error('TEST_MONGODB_URI is not defined');
  }
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 60000);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
}, 60000);

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog Title',
    author: 'Author Name',
    url: 'http://example.com',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1);
}, 60000);

afterAll(async () => {
  await mongoose.connection.close();
});
