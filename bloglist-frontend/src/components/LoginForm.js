import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ 
   userName,
   password,
   setUserName, 
   setPassword, 
   setUser, 
   setMessage, 
   setMessageClass,
   showLogin
  }) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        userName, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      setMessageClass('error')
      setMessage('Invalid Username or Password')
      setTimeout(() => {
        setMessage(null)
      },  5000)
      setUserName('')
      setPassword('')
    }
  }
  if (showLogin === false) {
    return null
  }
  
  return (
    <form onSubmit={handleLogin} className="form">
      <h2 className="login-secondary-text">Login</h2>
      <div>
        <TextField
          id="username"
          type="text"
          value={userName}
          label="Username"
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
          margin="normal"
        />
      </div>
      <div>
        <TextField
          id="password"
          type="password"
          value={password}
          label="Password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          margin="normal"
        />
      </div>
      <Button color="primary" type="submit" id="login-button">login</Button>
    </form>  
  )  
}
export default LoginForm