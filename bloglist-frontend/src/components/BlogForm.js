import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, setMessageClass } from '../reducers/notificationReducer'
import { TextField, Button } from '@mui/material'

const BlogForm = ({
   addBlog
  }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleNewBlog = (blogObject) => {
    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleMissingInput = () => {
    dispatch(setMessageClass('error'))
    dispatch(setNotification('Title and URL are required fields', 5))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogObject.title === '' || blogObject.url === ''
    ? handleMissingInput()
    : handleNewBlog(blogObject)
  }
  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>Create New Blog</h2>
      <div>
        <TextField
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          margin="normal"
          label="Title"
        />
      </div>
      <div>
        <TextField
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          margin="normal"
          label="Author"
        />
      </div>
      <div>
        <TextField
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          margin="normal"
          label="URL"
        />
      </div>
      <Button color="inherit" id="blog-submit-button" type="submit">Add new</Button>
    </form>  
  )
}

export default BlogForm
