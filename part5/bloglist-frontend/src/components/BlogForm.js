import PropTypes from 'prop-types'

const BlogForm = props => (
    <div>
      <h1>create new</h1>
      <form onSubmit={props.handleBlogCreate}>
        title:<input
          type="text"
          value={props.title}
          name="title"
          onChange={props.handleTitleChange} /> <br />
        author:<input
          type="text"
          value={props.author}
          name="author"
          onChange={props.handleAuthorChange} /> <br />
        url:<input
          type="text"
          value={props.url}
          name="url"
          onChange={props.handleURLChange} /> <br />
        <button type="submit">create</button> <br />
      </form>
    </div>  
  )

  BlogForm.propTypes = {
    handleBlogCreate: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleURLChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }
  
  export default BlogForm