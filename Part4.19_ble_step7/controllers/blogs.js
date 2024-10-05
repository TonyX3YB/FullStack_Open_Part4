import jwt from 'jsonwebtoken';
import express from 'express';
import Blog from '../models/blog.js';  // Make sure the file paths are correct and have the .js extension
import User from '../models/user.js';  // Make sure the file paths are correct and have the .js extension

const blogsRouter = express.Router();

// Helper function to extract token
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

// POST request to create a new blog post
blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  // Verify the token
  const token = getTokenFrom(request);
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return response.status(401).json({ error: 'token invalid' });
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  // Find the user from the token
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(404).json({ error: 'user not found' });
  }

  // Create new blog post
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  // Save blog post and update user's blog list
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

export default blogsRouter; // Use default export for ES modules
