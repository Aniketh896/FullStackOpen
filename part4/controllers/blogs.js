const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

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

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!(body.title && body.url)) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: !body.likes ? 0 : body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blogFound = await Blog.findById(request.params.id)

  if (blogFound.user.toString() === user.id) {
    const blogs = await Blog.findByIdAndRemove(request.params.id)

    const blogAfterDeletion = user.blogs.filter((blog) => {
      return blog.toString() !== request.params.id
    })

    user.blogs = blogAfterDeletion
    await user.save()

    blogs
      ? response.status(204).end()
      : response.status(404).end()
  } else {
    // eslint-disable-next-line quotes
    return response.status(401).json({ error: `Invalid Action: this blog was not created by ${user.username}` })
  }
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