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
}, 100000)

describe('blog_api testing', () => {
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

  test('a valid blog can be added', async () => {
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

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContainEqual(
      'Jest Blog'
    )
  })

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

  test('blog without title will send 400 Bad Request', async () => {
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

  test('blog without url will send 400 Bad Request', async () => {
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

  test('unique identifier property is 0', async () => {
    const response = await api.get('/api/blogs')

    const unique_id = response.body[0].id
    expect(unique_id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})