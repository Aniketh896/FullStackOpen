import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = async () => await blogService.put(blog.id, { ...blog, likes: blog.likes + 1 })
  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
    }
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
        <input type="button" value='remove' onClick={deleteBlog}/>
      </div>
    </div>
  )
}

export default Blog