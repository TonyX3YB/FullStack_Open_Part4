const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET request for all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// POST request for adding new blogs
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  response.json(savedBlog)
});

module.exports = blogsRouter;



