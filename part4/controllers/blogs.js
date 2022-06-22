const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  blog
    ? response.json(blog)
    : response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {

  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).end()
  }

  request.body.likes = request.body.likes === undefined ? 0 : request.body.likes
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
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