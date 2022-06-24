import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      //blogService.setToken(user.token)    
    }  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(        
        'loggedBlogappUser', JSON.stringify(user)      
      )
      setUser(user)
      setUsername('')
      setPassword('')
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
      {user.name} logged in <input type='button' value='logout' onClick={handleLogout}/>
      <p>
        {blogs.map(blog =>
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
