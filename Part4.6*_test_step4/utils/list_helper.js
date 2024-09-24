// utils/list_helper.js
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((favorite, blog) =>
    blog.likes > favorite.likes ? blog : favorite
  )
}

// New function for step 4: mostBlogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // Create an object with authors and their blog counts
  const authorBlogCount = blogs.reduce((countMap, blog) => {
    countMap[blog.author] = (countMap[blog.author] || 0) + 1;
    return countMap;
  }, {});

  // Find the author with the most blogs
  const mostBloggedAuthor = Object.keys(authorBlogCount).reduce((topAuthor, author) => {
    return authorBlogCount[author] > authorBlogCount[topAuthor] ? author : topAuthor;
  });

  return {
    author: mostBloggedAuthor,
    blogs: authorBlogCount[mostBloggedAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs, // Export the new function
};
