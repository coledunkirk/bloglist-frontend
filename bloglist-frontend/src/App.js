import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import UserForm from './components/UserForm'
import ToggleLogin from './components/ToggleLogin'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('added')
  const [sortLikes, setSortLikes] = useState(false)
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()
  const loginRef = useRef()

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setUserName('')
    setPassword('')
  }

  const likeBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Delete "${blog.title}"?`)) {
      const id = blog.id
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setMessageClass('added')
      setMessage(`"${blogObject.title}" was added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (error) {
      console.log(error.response.data)
      setMessageClass('error')
      setMessage('Error- couldn\'t add new blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogsToShow = sortLikes
  ? (function sortBlogs() {
    const blogCopy = [...blogs]
    const sortedBlogList = blogCopy.sort((blog1, blog2) => blog2.likes - blog1.likes)
    return sortedBlogList
  })()
  : blogs
  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification 
          message={message}
          messageClass={messageClass}
        />
        <LoginForm 
          userName={userName}
          password={password}
          user={user}
          setUserName={setUserName}
          setPassword={setPassword}
          setUser={setUser}
          setMessage={setMessage}
          setMessageClass={setMessageClass}
          showLogin={showLogin}
        />
        <ToggleLogin buttonLabelWhenHidden='New User'
           buttonLabelWhenShown='cancel' 
           showLogin={showLogin}
           setShowLogin={setShowLogin}
           ref={loginRef}
          >
          <UserForm
             userName={userName}
             password={password}
             user={user}
             setUserName={setUserName}
             setPassword={setPassword}
             setMessage={setMessage}
             setMessageClass={setMessageClass}
             loginRef={loginRef}
          />
        </ToggleLogin>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <h2>
        {user.userName} is logged in<button onClick={handleLogout}>logout</button>
      </h2>
      <Notification 
        message={message}
        messageClass={messageClass}
      />
      <Toggle 
        buttonLabelWhenHidden='Add new blog' 
        buttonLabelWhenShown='cancel'
        ref={blogFormRef}
      >
        <BlogForm
          setMessage={setMessage}
          setMessageClass={setMessageClass}
          addBlog={addBlog}
        />
      </Toggle>
      <div>sort by: 
        <button onClick={() => setSortLikes(false)}>age</button>
        <button onClick={() => setSortLikes(true)}>likes</button>
      </div>
      {blogsToShow.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          user={user}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App