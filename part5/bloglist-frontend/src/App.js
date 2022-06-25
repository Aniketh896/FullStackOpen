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
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [notification, setNotification] = useState({})

  const createFormRef = useRef()

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
        message: `wrong username or password`,
        type: 'error'
      })
      setTimeout(() => {          
        setNotification({})
      }, 5000) 
    }
  }

  const handleBlogCreate = async event => {
    event.preventDefault()
    try {
      createFormRef.current.toggleVisibility()
      await blogService.create({ title, author, url })
      setNotification({
        message: `a new blog ${title} by ${author} added`,
        type: 'created'
      })
      setTimeout(() => {
        setNotification({})        
      }, 5000) 
      
      setTitle('')
      setAuthor('')
      setURL('')
      setUser(user)
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification notification={notification}/>
      <form onSubmit={handleLogin}>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} /> <br />
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} /> <br />
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogData = user => (
      <div>
        <h1>blogs</h1>
        <Notification notification={notification}/>
        {user.name} logged in <input type='button' value='logout' onClick={handleLogout}/>
        <Togglable buttonLabel='new note' ref={createFormRef}>
          <BlogForm handleBlogCreate={handleBlogCreate} title={title} author={author} url={url} 
            handleTitleChange={({ target }) => setTitle(target.value)} 
            handleAuthorChange={({ target }) => setAuthor(target.value)} 
            handleURLChange={({ target }) => setURL(target.value)}/>
        </Togglable>
        <p>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} />
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
