const mongoose = require('mongoose');
const Blog = require('../models/blog');

// Connect to the test database
beforeAll(async () => {
  const url = process.env.TEST_MONGODB_URI || 'mongodb+srv://fullstackopen:Helsinki@cluster0.1iwiv.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0';
  await mongoose.connect(url);
}, 60000);  // Increase to 30 seconds

beforeEach(async () => {
  await Blog.deleteMany({});
}, 60000);  // Increase timeout for cleanup

test('a valid blog post is saved to the database', async () => {
  const testBlog = {
    title: 'Test Blog',
    author: 'Tester',
    url: 'http://testurl.com',
    likes: 0,
  };

  await new Blog(testBlog).save();

  const blogs = await Blog.find({});
  expect(blogs).toHaveLength(1);
  expect(blogs[0].title).toBe('Test Blog');
}, 60000);  // Increase timeout for the test itself

// Close the connection after all tests
afterAll(async () => {
  await mongoose.connection.close();  // Ensure proper teardown
}, 60000);  // Increase timeout for teardown
