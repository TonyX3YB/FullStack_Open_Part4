// app.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./routes/users');
const middleware = require('./utils/middleware');
require('dotenv').config();

const app = express(); // Declare app once
const server = http.createServer(app); // Create the server with the app

// Middleware setup
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

// Error handling middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

// Start the server
const startServer = async () => {
  await connectToDatabase();
  server.listen(process.env.PORT || 3003, () => {
    console.log(`Server running on port ${process.env.PORT || 3003}`);
  });
};

startServer();

// Export the app and server for use in tests
module.exports = { app, server };
