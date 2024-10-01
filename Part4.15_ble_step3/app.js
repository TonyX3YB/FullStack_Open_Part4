const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const usersRouter = require('./routes/users');
const middleware = require('./utils/middleware');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
