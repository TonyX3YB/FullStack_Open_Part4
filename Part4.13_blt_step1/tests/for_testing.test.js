// tests/for_testing.test.js
require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const mongoUri = process.env.TEST_MONGODB_URI;

// Use a single connection for all tests
beforeAll(async () => {
  // Check if already connected to the test database
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
}, 60000);  // Set timeout to 60 seconds for the connection

beforeEach(async () => {
  // Clear the blogs collection before each test
  await Blog.deleteMany({});
}, 60000);  // Set timeout for the cleanup process

test('a valid blog post is saved to the database', async () => {
  const testBlog = {
    title: 'Test Blog',
    author: 'Tester',
    url: 'http://testurl.com',
    likes: 0,
  };

  // Save a new blog post
  const response = await api.post('/api/blogs').send(testBlog).expect(201); // Send a POST request
  expect(response.body.title).toBe('Test Blog');

  // Fetch all blogs from the database and check that one blog has been saved
  const blogs = await Blog.find({});
  expect(blogs).toHaveLength(1);
  expect(blogs[0].title).toBe('Test Blog');
}, 60000);  // Set timeout for the test itself

afterAll(async () => {
  await mongoose.connection.close(); // Close the connection after all tests
}, 60000);  // Set timeout for proper teardown
