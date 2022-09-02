import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setNotification, setMessageClass } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ 
   userName,
   password,
   setUserName, 
   setPassword,  
   showLogin
}) => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        userName, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      ) 
      dispatch(setUser(user))
      setUserName('')
      setPassword('')
    } catch (exception) {
      dispatch(setMessageClass('error'))
      dispatch(setNotification('Invalid Username or Password', 5))
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