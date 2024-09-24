const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// Modify toJSON to return 'id' instead of '_id' and remove '__v'
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject.id.toString() // Rename _id to id
    delete returnedObject                       // Remove _id
    delete returnedObject                       // Remove __v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
