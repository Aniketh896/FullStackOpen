const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  blog
    ? response.json(blog)
    : response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {

  const { title, author, url, likes, userId } = request.body

  const finalUserId = !userId ? '62b326e073a22f60e245c3ca' : userId

  const user = await User.findById(finalUserId)

  if (!title || !url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: !likes ? 0 : likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogs = await Blog.findByIdAndRemove(request.params.id)

  blogs
    ? response.status(204).end()
    : response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const blog = {
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  )

  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter