const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 100000)

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
    const newUser = {
      'username': 'test_user_1',
      'name': 'Test User 1',
      'password': 'test1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const login = await api
      .post('/api/login')
      .send({
        username: 'test_user_1',
        password: 'test1'
      })
      .expect(200)

    const newBlog = {
      title: 'Jest Blog',
      author: 'Jest Author',
      url: 'https://www.jestauthor.com',
      likes: 23
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${login.body.token}` })
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContainEqual(
      'Jest Blog'
    )
  })

  test('fails with status code 401 if token not provided', async () => {
    const newUser = {
      'username': 'test_user_2',
      'name': 'Test User 2',
      'password': 'test2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    await api
      .post('/api/login')
      .send({
        username: 'test_user_2',
        password: 'test2'
      })
      .expect(200)

    const newBlog = {
      title: 'Jest Blog',
      author: 'Jest Author',
      url: 'https://www.jestauthor.com',
      likes: 23
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  })

  test('fails with status code 400 if title is undefined', async () => {
    const newUser = {
      'username': 'test_user_2',
      'name': 'Test User 2',
      'password': 'test2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const login = await api
      .post('/api/login')
      .send({
        username: 'test_user_2',
        password: 'test2'
      })
      .expect(200)

    const newBlog = {
      author: 'Jest Author',
      url: 'https://www.jestauthor.com',
      likes: 23
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${login.body.token}` })
      .send(newBlog)
      .expect(400)
  })

  test('fails with status code 400 if url is undefined', async () => {
    const newUser = {
      'username': 'test_user_2',
      'name': 'Test User 2',
      'password': 'test2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const login = await api
      .post('/api/login')
      .send({
        username: 'test_user_2',
        password: 'test2'
      })
      .expect(200)

    const newBlog = {
      title: 'Jest Blog',
      author: 'Jest Author',
      likes: 23
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${login.body.token}` })
      .send(newBlog)
      .expect(400)
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const newUser = {
      'username': 'test_user_2',
      'name': 'Test User 2',
      'password': 'test2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const login = await api
      .post('/api/login')
      .send({
        username: 'test_user_2',
        password: 'test2'
      })
      .expect(200)

    const newBlog = {
      title: 'Jest Blog',
      author: 'Jest Author',
      url: 'https://www.jestauthor.com',
      likes: 23
    }

    const newCreatedBlog = await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${login.body.token}` })
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(201)


    await api
      .delete(`/api/blogs/${newCreatedBlog.body.id}`)
      .set({ 'Authorization': `Bearer ${login.body.token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
  })
})

describe('updation of a note', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToUpdate = blogAtStart[0]

    const newBlog = {
      likes: 50
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    expect(blogsAtEnd[0].likes).toBe(50)
  })
})

describe('other tests', () => {
  test('blog without likes will default to 0', async () => {
    const newUser = {
      'username': 'test_user_1',
      'name': 'Test User 1',
      'password': 'test1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const login = await api
      .post('/api/login')
      .send({
        username: 'test_user_1',
        password: 'test1'
      })
      .expect(200)

    const newBlog = {
      title: 'Jest Blog',
      author: 'Jest Author',
      url: 'https://www.jestauthor.com'
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${login.body.token}` })
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
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