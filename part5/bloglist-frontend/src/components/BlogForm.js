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
  
  export default BlogForm