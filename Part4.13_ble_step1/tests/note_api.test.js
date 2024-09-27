require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const helper = require('./test_helper'); // Adjust the path as needed
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeAll(async () => {
  // Ensure you are connecting to the test database only once
  if (mongoose.connection.readyState === 0) {
    const mongoUri = process.env.TEST_MONGODB_URI; // Use environment variable
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

beforeEach(async () => {
  await Blog.deleteMany({});  // Ensure Blog is defined here
  await Blog.insertMany(helper.initialBlogs);
});

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
  expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1);  // Adjust this based on how many blogs should exist
});

afterAll(async () => {
  await mongoose.connection.close(); // Close the connection after all tests
});
