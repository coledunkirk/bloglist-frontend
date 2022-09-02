import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { findBlog } from '../reducers/blogReducer'
import { Button, List, ListSubheader, ListItem, ListItemText, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { setNotification, setMessageClass } from '../reducers/notificationReducer'

const IndividualBlog = ({ likeBlog, deleteBlog, addComment, user }) => {
  const [newComment, setNewComment] = useState('')
  const id = useParams().id
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(findBlog(id))
  })
  const selectedBlog = useSelector(({ blogs }) => blogs.selectedBlog)
  if (!selectedBlog) {
    return null
  }
  
  const getUserName = !selectedBlog.user
  ? null
  : selectedBlog.user.userName

  const handleLike = () => {
    const blogObject = {
      title: selectedBlog.title,
      author: selectedBlog.author,
      url: selectedBlog.url,
      likes: selectedBlog.likes + 1
    }
    likeBlog(id, blogObject)
  }

  const handleNewComment = (commentObject) => {
    const id = selectedBlog.id
    addComment(id, commentObject)
    setNewComment('')
  }

  const handleMissingInput = () => {
    dispatch(setMessageClass('error'))
    dispatch(setNotification('Please enter a comment', 5))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const commentObject = {
      comment: newComment
    }
    commentObject.comment === ''
    ? handleMissingInput()
    : handleNewComment(commentObject)
  }

  const handleDelete = () => {
    deleteBlog(selectedBlog)
  }

  const showDeleteButton = () => {
    if (!selectedBlog.user) return null
    if (selectedBlog.user.userName === user.userName) {
      return (
        <Button variant="contained" style={{marginTop: 10}} onClick={handleDelete} color="error">delete</Button>
      )
    } else {
      return null
    }
  }
  
  return(
    <>
      <h1>{selectedBlog.title}</h1>
      <h2>{selectedBlog.author}</h2>
      <div>{selectedBlog.url}</div>
      <div>
        {selectedBlog.likes}
        <Button color="success" id="like-button" onClick={handleLike}>like</Button>
      </div>
      <div>{getUserName}</div>
      {showDeleteButton()}
      <form onSubmit={handleSubmit}>
        <TextField
          id="comment"
          type="text"
          value={newComment}
          name="comment"
          onChange={({ target }) => setNewComment(target.value)}
          margin="normal"
          label="Comment"
          size="small"
          variant="standard"
          color="info"
        />
        <Button 
          id="comment-submit-button" 
          color="inherit" 
          size="small" 
          type="submit" 
          sx={{mt: 4, ml: 1}}
        >
          Add Comment
        </Button>
      </form>
      <List subheader={
          <ListSubheader sx={{p: 0}}>COMMENTS</ListSubheader>
        }
      >
        {selectedBlog.comments.map(com => 
          <ListItem key={com.id} sx={{ pt: 0, pb: 0 }}>
            <ListItemText primary={com.comment} />
          </ListItem>)}
      </List>
    </>
    )
}

export default IndividualBlog