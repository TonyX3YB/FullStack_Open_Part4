require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

beforeAll(async () => {
  // Ensure you are connecting to the test database only once
  if (mongoose.connection.readyState === 0) {
    const mongoUri = process.env.TEST_MONGODB_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}, 60000); // Set timeout for connection

beforeEach(async () => {
  // Clear the blogs collection before each test
  await Blog.deleteMany({});
}, 60000); // Set timeout for cleanup

test('blogs are returned as json', async () => {
  const response = await supertest(app).get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toBeDefined(); // Adjust expectations as necessary
});

afterAll(async () => {
  await mongoose.connection.close(); // Close the connection after all tests
});
