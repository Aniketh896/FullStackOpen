const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(res => res.author)
    expect(authors).toContainEqual(
      'Initial Author 2'
    )
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Jest Blog',
      author: 'Jest Author',
      url: 'https://www.jestauthor.com',
      likes: 23
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContainEqual(
      'Jest Blog'
    )
  })

  test('fails with status code 400 if title is undefined', async () => {
    const newBlog = {
      author: 'Jest Author',
      url: 'https://www.jestauthor.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('fails with status code 400 if url is undefined', async () => {
    const newBlog = {
      title: 'Jest Blog',
      author: 'Jest Author',
      likes: 23
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('viewing a specific blog', () => {
  test('blog without likes will default to 0', async () => {
    const newBlog = {
      title: 'Jest Blog',
      author: 'Jest Author',
      url: 'https://www.jestauthor.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('unique identifier property is 0', async () => {
    const response = await api.get('/api/blogs')

    const unique_id = response.body[0].id
    expect(unique_id).toBeDefined()
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(res => res.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})