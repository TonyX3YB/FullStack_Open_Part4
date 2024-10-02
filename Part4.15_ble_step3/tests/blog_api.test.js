// blogs_api.test.js
const server = require('../app'); // Import the server

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Import the existing app instance
const api = supertest(app); // Use the imported app

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

  await api
    .put(`/api/blogs/${createdBlog.body.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/);
});


// Closing MongoDB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
  server.close(); // Close server
});
