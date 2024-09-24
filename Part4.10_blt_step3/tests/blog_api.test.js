// tests/blog_api.test.js
require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

describe('Blog API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Tester',
      url: 'http://testurl.com',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Content-Type', 'application/json') // Ensure proper content type
      .expect(201); // Expect a Created response
  });
});
