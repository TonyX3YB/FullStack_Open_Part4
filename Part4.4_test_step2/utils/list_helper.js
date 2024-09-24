const dummy = (blogs) => {
  return 1
}

// New totalLikes function
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}
