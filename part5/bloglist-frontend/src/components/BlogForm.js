// import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = props => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleBlogCreate = async event => {

    event.preventDefault()
    try {
      props.createBlog({
        title: title,
        author: author,
        url: url
      })

      props.setNotification({
        message: `a new blog ${title} by ${author} added`,
        type: 'created'
      })
      setTimeout(() => {
        props.setNotification({})
      }, 5000)
      setTitle('')
      setAuthor('')
      setURL('')
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleURLChange = (event) => setURL(event.target.value)

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleBlogCreate}>
        title:<input
          type="text"
          name="title"
          value={title}
          placeholder="enter the Title..."
          onChange={handleTitleChange} /> <br />
        author:<input
          type="text"
          name="author"
          value={author}
          placeholder="enter the Author..."
          onChange={handleAuthorChange} /> <br />
        url:<input
          type="text"
          name="url"
          value={url}
          placeholder="enter the URL..."
          onChange={handleURLChange} /> <br />
        <button type="submit">create</button> <br />
      </form>
    </div>
  )
}

// BlogForm.propTypes = {
//   handleBlogCreate: PropTypes.func.isRequired,
//   handleTitleChange: PropTypes.func.isRequired,
//   handleAuthorChange: PropTypes.func.isRequired,
//   handleURLChange: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   author: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired
// }

export default BlogForm