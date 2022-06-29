import ToggleDetails from './ToggleDetails'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const getUserName = !blog.user
  ? null
  : blog.user.userName

  const handleLike = () => {
    const id = blog.id
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    likeBlog(id, blogObject)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  const showDeleteButton = () => {
    if (!blog.user) return null
    if (blog.user.userName === user.userName) {
      return (
        <button onClick={handleDelete}>delete</button>
      )
    } else {
      return null
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <ToggleDetails 
        blog={blog} 
        buttonLabelWhenHidden='show details' 
        buttonLabelWhenShown='hide details'
      >
        <div>
          <div>{blog.url}</div>
          <div id="blog-likes">
            {blog.likes} 
            <button id="like-button" onClick={handleLike}>like</button>
          </div>
          <div>
            {getUserName}
          </div>
          {showDeleteButton()}
        </div>
      </ToggleDetails>
    </div>  
  )
}

export default Blog