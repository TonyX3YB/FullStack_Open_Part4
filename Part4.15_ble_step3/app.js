// app.js
const express = require('express');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./routes/users');
const middleware = require('./utils/middleware');
const cors = require('cors');
require('dotenv').config();

const app = express(); // Declare app once

// Middleware setup
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

// Error handling middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Export app for use in index.js and tests
module.exports = app;
