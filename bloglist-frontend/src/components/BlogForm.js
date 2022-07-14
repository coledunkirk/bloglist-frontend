import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({
   setMessage, 
   setMessageClass,
   addBlog
  }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (blogObject) => {
    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleMissingInput = () => {
    setMessageClass('error')
    setMessage('Title and URL are required fields')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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
