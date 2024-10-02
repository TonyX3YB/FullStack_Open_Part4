// routes/blogs.js
const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;

  // Find the first user from the database
  const user = await User.findOne();

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id // Assigning the user as the creator
  });

  const savedBlog = await blog.save();
  
  // Populate the creator's user information before responding
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1,
  });

  res.status(201).json(populatedBlog);
});

module.exports = router;
