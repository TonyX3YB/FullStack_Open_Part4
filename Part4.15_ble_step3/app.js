module.exports = {
  presets: ['@babel/preset-env'],
};

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogsRouter from './controllers/blogs.js';
import usersRouter from './routes/users.js';
import middleware from './utils/middleware.js';

import app from '../app.js';
import supertest from 'supertest';
import http from 'http';

const api = supertest(http.createServer(app));  // Wrap app with http server

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Test cases for updating a blog post
describe('updating the number of likes of a blog post', () => {
  test('successfully updates the number of likes', async () => {
    const blogToUpdate = {
      id: 'some-existing-id', // Make sure to use a valid blog ID for this test
    };

    const updatedBlogData = {
      likes: 10,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

export default app;
