const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Initial Blog 1',
    author: 'Initial Author 1',
    url: 'https://www.initialauthor1.com',
    likes: 10
  },
  {
    title: 'Initial Blog 2',
    author: 'Initial Author 2',
    url: 'https://www.initialauthor2.com',
    likes: 23
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}