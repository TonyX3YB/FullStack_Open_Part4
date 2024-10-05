// app.js
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import blogsRouter from './controllers/blogs.js';
import usersRouter from './routes/users.js';
import { unknownEndpoint, errorHandler } from './utils/middleware.js'; // Import the error handler from middleware
import dotenv from 'dotenv';
import loginRouter from './controllers/login.js'; // Add .js to the import path

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);

// Error handling middleware
app.use(unknownEndpoint);
app.use(errorHandler); // Use the imported error handler

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

export default app;
