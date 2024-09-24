const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

// Test for verifying 'id' exists and '_id' does not
test('blog posts have a field named id', async () => {
  const response = await api.get('/api/blogs')
  
  // Check if all blogs have the 'id' field and not the '_id' field
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
    expect(blog._id).not.toBeDefined()
  })
})

after(async () => {
  await mongoose.connection.close()
})
