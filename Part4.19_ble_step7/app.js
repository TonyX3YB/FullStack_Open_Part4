import express from 'express';
import mongoose from 'mongoose';
import blogsRouter from './controllers/blogs.js';
import usersRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import tokenExtractor from './middleware/tokenExtractor.js';
import config from './utils/config.js';

const app = express();

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.error('error connecting to MongoDB:', err.message));

// Middleware
app.use(express.json()); // For parsing application/json
app.use(tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

export default app;
