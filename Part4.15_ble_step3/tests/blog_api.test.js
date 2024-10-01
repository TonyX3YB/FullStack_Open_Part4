// tests/blog_api.test.js
require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);

const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Author 1',
    url: 'http://testurl1.com',
    likes: 1,
  },
  {
    title: 'Test Blog 2',
    author: 'Author 2',
    url: 'http://testurl2.com',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('updating the number of likes of a blog post', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToUpdate = blogsAtStart[0];

  const updatedBlogData = { likes: 10 };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await Blog.find({});
  const updatedBlog = blogsAtEnd[0];

  expect(updatedBlog.likes).toBe(10);
});

afterAll(async () => {
  await mongoose.connection.close();
});

