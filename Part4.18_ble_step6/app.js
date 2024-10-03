// app.js
import express from 'express';
import http from 'http'; // Change require to import
import mongoose from 'mongoose'; // Change require to import
import cors from 'cors';
import blogsRouter from './controllers/blogs.js'; // Add .js to the import path
import usersRouter from './routes/users.js'; // Add .js to the import path
import { unknownEndpoint, errorHandler } from './utils/middleware.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express(); // Declare app once
const server = http.createServer(app); // Create the server with the app
const loginRouter = require('./controllers/login.js');

// Middleware setup
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);


// Error handling middleware
const errorHandler = (error, request, response, next) => {
  if (error.name === 'JsonWebTokenError') {
    return 
  }
}
app.use(unknownEndpoint);
app.use(errorHandler);

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
  server.listen(process.env.PORT || 3011, () => {
    console.log(`Server running on port ${process.env.PORT || 3011}`);
  });
};

startServer();

export default app; // Export the app as the default
