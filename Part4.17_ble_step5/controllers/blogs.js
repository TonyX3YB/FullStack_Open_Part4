// controllers/blogs.js
import express from 'express';
import Blog from '../models/blog.js';

const blogsRouter = express.Router();

// Get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// Add a new blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

// PUT route to update the number of likes for a blog
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    { likes: body.likes }, 
    { new: true, runValidators: true, context: 'query' }
  );
  response.json(updatedBlog);
});

// Get blog by id
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

// Export the router
export default blogsRouter;
