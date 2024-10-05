// tests/user_api.test.js
require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require('supertest');
const { app, server } = require('../app'); // Updated to import server
const User = require('../models/user');

const api = supertest(app);

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) { // 0 means disconnected
  await mongoose.connect(process.env.TEST_MONGODB_URI);
}}, 60000);


beforeEach(async () => {
  await User.deleteMany({});
}, 60000); 

test('creating a new user succeeds with a fresh username', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'secretpass',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const users = await User.find({});
  expect(users).toHaveLength(1);
  expect(users[0].username).toBe('testuser');
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close(); // Close the server after all tests
});
