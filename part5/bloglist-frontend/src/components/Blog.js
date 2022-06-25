import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = async () => {
    //const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    const updatedObject = {
      // user: loggedUserJSON,
      likes: blog.likes + 1,
      // author: blog.author,
      // title: blog.title,
      // url: blog.url
    }
    await blogService.put(blog.id, updatedObject)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} >
        {blog.title} {blog.author} 
        <input type="button" value='view' onClick={toggleVisibility}/>
      </div>
      <div style={showWhenVisible} >
        {blog.title} {blog.author}
        <input type="button" value='hide' onClick={toggleVisibility}/> <br/>
        {blog.url} <br/>
        {blog.likes} <input type="button" value='like' onClick={increaseLikes}/> <br/>
        {blog.user ? blog.user.name : 'unknown'} <br/>
      </div>
    </div>
  )
}

export default Blog