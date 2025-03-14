import mongoose from 'mongoose';
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Temporary blog',
    author: 'Temp Author',
    url: 'http://tempblog.com',
  });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(b => b.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};

afterAll(async () => {
  await mongoose.connection.close();
});
