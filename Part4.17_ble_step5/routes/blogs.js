// routes/blogs.js
const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

const router = express.Router();

// Endpoint for creating new blogs
router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;

  // Find the first user from the database
  const user = await User.findOne();

  if (!user) {
    return res.status(400).json({ error: 'No users available to assign as creator' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id, // Assigning the user as the creator
  });

  const savedBlog = await blog.save();

  // Populate the creator's user information before responding
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1,
  });

  res.status(201).json(populatedBlog);
});

// Endpoint for listing all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

module.exports = router;
