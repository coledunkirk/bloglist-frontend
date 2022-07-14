import ToggleDetails from './ToggleDetails'
import { TableRow, TableCell, Button } from '@mui/material'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const blogStyle = {
    marginTop: 10
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
        <Button style={blogStyle} variant="contained" onClick={handleDelete} color="error">delete</Button>
      )
    } else {
      return null
    }
  }

  return (
    <TableRow className="blog"> 
      <TableCell>{blog.title}</TableCell>
      <TableCell>{blog.author}</TableCell>
      <ToggleDetails 
        blog={blog} 
        buttonLabelWhenHidden='show details' 
        buttonLabelWhenShown='hide details'
      >
        <div style={blogStyle}>
          <div>{blog.url}</div>
          <div id="blog-likes">
            {blog.likes} 
            <Button color="success" id="like-button" onClick={handleLike}>like</Button>
          </div>
          <div>
            {getUserName}
          </div>
          {showDeleteButton()}
        </div>
      </ToggleDetails>
    </TableRow>  
  )
}

export default Blog