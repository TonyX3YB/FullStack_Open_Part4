module.exports = {
  presets: ['@babel/preset-env'],
};
// const express = require('express');
// const mongoose = require('mongoose');
require('dotenv').config();
// const usersRouter = require('./routes/users');
// const middleware = require('./utils/middleware');
// const blogsRouter = require('./controllers/blogs');

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogsRouter from './controllers/blogs.js';
import usersRouter from './routes/users.js';
import middleware from './utils/middleware.js';


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
