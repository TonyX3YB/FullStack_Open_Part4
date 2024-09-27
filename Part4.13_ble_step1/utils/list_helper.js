const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// New function to find the blog with the most likes
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const { title, author, likes } = blogs.reduce((favorite, current) => {
      return current.likes > favorite.likes ? current : favorite
  })

  return { title, author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
