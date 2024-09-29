const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// Get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// Add a new blog
blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

// PUT route to update the number of likes for a blog
blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body;

  // Only update the likes field
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' } // Options to return updated document and validate
  );

  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.status(404).end();
  }
});

module.exports = blogsRouter;
