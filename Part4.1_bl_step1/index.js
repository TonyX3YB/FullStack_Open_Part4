const app = require('./app') // The Express app
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const dotenv = require('dotenv').config();
const Note = require('./models/note');

const server = http. createServer(app)

const express = require('express')
// const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3003
// app.listen(PORT, () => {
  server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

