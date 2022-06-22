const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'x', author: 'a', url: 'https://www.dummy.com', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog.id
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  nonExistingId
}