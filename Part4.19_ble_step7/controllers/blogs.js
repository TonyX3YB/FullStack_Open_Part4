import express from 'express';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const blogsRouter = express.Router();

// GET all blogs
blogsRouter.get('/', async (req, res) => {
  try {
      const blogs = await Blog.find({});
      res.json(blogs);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching blogs' });
  }
});

// Helper function to extract token from request
const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

// POST /api/blogs: Create a new blog post
blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const token = getTokenFrom(request);
  if (!token) {
    return response.status(401).json({ error: 'token missing' });
  }

  // Verify and decode token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return response.status(401).json({ error: 'token invalid' });
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  // Find the user associated with the token
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).json({ error: 'invalid user' });
  }

  // Create a new blog
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  });

  // Save the blog post
  const savedBlog = await blog.save();

  // Add the blog ID to the user's list of blogs
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

export default blogsRouter;
