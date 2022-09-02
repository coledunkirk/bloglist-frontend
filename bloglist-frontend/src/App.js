import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import BlogPage from './components/BlogPage'
import Notification from './components/Notification'
import UserForm from './components/UserForm'
import ToggleLogin from './components/ToggleLogin'
import UserPage from './components/UserPage'
import IndividualUser from './components/IndividualUser'
import IndividualBlog from './components/IndividualBlog'
import { setNotification, setMessageClass } from './reducers/notificationReducer'
import { newBlog, incrementLikes, setBlogs, removeBlog, setSelected, incrementComments } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { Button, Container, AppBar, Toolbar, Box, Typography } from '@mui/material'
import { Routes, Route, useMatch, Link, useNavigate } from 'react-router-dom'

const App = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showLogin, setShowLogin] = useState(true)
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs( blogs ))
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )  
  }, [])

  const user = useSelector(({ user }) => user)

  const blogFormRef = useRef()
  const loginRef = useRef()
  const userMatch = useMatch('/users/:id')
  const navigate = useNavigate()

  const selectedUser = userMatch 
  ? users.find(u => u.id === userMatch.params.id)
  : null

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logoutUser())
    setUserName('')
    setPassword('')
  }

  const likeBlog = async (id, blogObject) => {
    const likedBlog = await blogService.update(id, blogObject)
    dispatch(incrementLikes(likedBlog))
    dispatch(setSelected(likedBlog))
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Delete "${blog.title}"?`)) {
      const id = blog.id
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id))
      navigate('/')
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogObject)
      dispatch(newBlog(createdBlog))
      dispatch(setMessageClass('added'))
      dispatch(setNotification(`"${blogObject.title}" was added`, 5))
    }
    catch (error) {
      console.log(error.response.data)
      dispatch(setMessageClass('error'))
      dispatch(setNotification('Error- couldn\'t add new blog', 5))
    }
  }

  const addComment = async (id, commentObject) => {
    try {
      const blogWithNewComment = await blogService.comment(id, commentObject)
      console.log(blogWithNewComment)
      dispatch(incrementComments(blogWithNewComment))
      dispatch(setSelected(blogWithNewComment))
      dispatch(setMessageClass('added'))
      dispatch(setNotification('New comment added', 5))
    }
    catch (error) {
      console.log(error.response.data)
      dispatch(setMessageClass('error'))
      dispatch(setNotification('Error- couldn\'t add new comment', 5))
    }
  }

  if (user === null) {
    return(
      <div>
        <div className="main">
          <h1 className="main-text">Blogs</h1>
        </div>
          <Notification />
          <LoginForm 
            userName={userName}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}
            showLogin={showLogin}
          />
          <ToggleLogin 
            buttonLabelWhenHidden='New User'
            buttonLabelWhenShown='cancel' 
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            ref={loginRef}
          >
          <UserForm
            userName={userName}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}
            loginRef={loginRef}
            users={users}
            setUsers={setUsers}
          />
          </ToggleLogin>
        </div>
      )
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav" sx={{background: '#1f2937'}}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1}}
            >
              Blogs
            </Typography>
            <Box>
              <Button color="inherit" component={Link} to="/">
                home
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>  
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{pt: 10, pb: 10}}>
        <Notification />
        <h2>
          {user.userName} is logged in<Button onClick={handleLogout} color="error">logout</Button>
        </h2>
        <Routes>
          <Route path="/" element={
            <BlogPage 
              blogFormRef={blogFormRef} 
              addBlog={addBlog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />} 
          />
          <Route path="/users" element={<UserPage users={users} />} />
          <Route path="/users/:id" element={<IndividualUser selectedUser={selectedUser} />} />
          <Route path="/blogs/:id" element={
            <IndividualBlog 
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              addComment={addComment}
              user={user}
            />} 
          />
        </Routes>
      </Container>
    </div>
  )
}

export default App