import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ notification }) => {

  if (!notification.type){
    return null
  }

  const notificationStyle = {
    color: `${notification.type === 'created' ? 'green' : 'red'}`,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle} id='notification'>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  const createFormRef = useRef()
  const BlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setNotification({
        message: 'wrong username or password',
        type: 'error'
      })
      setUser(null)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setNotification({})
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <div id='loginForm'>
      <h1>log in to application</h1>
      <Notification notification={notification}/>
      <form onSubmit={handleLogin}>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id='username'
          onChange={({ target }) => setUsername(target.value)} /> <br />
        password
        <input
          type="password"
          value={password}
          name="Password"
          id='password'
          onChange={({ target }) => setPassword(target.value)} /> <br />
        <button type="submit" id='login-button'>login</button>
      </form>
    </div>
  )

  const createBlog = async ({ title, author, url }) => {
    await blogService.create({ title, author, url })
    setUser(user)
  }

  const blogData = user => (
    <div>
      <h1>blogs</h1>
      <Notification notification={notification}/>
      {user.name} logged in <input type='button' value='logout' onClick={handleLogout}/>
      <Togglable buttonLabel='new note' ref={createFormRef}>
        <BlogForm setNotification={setNotification} user={user} createBlog={createBlog}/>
      </Togglable>
      <p>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} ref={BlogRef}/>
        )}
      </p>
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogData(user)
      }
    </div>
  )
}

export default App
