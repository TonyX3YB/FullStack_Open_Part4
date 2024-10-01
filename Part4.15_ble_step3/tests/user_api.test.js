const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

test('a new user can be created', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password123',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await User.find({});
  expect(usersAtEnd).toHaveLength(1);
  expect(usersAtEnd[0].username).toBe('testuser');
});

test('creation fails with proper status code and message if password is too short', async () => {
  const newUser = {
    username: 'testuser2',
    name: 'Test User 2',
    password: 'pw',
  };

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(result.body.error).toContain('Password must be at least 3 characters long');

  const usersAtEnd = await User.find({});
  expect(usersAtEnd).toHaveLength(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
