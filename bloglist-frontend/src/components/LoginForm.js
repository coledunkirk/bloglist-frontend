import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

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
    <form onSubmit={handleLogin}>
      <h2>Log in</h2>
      <div>
        username:
          <input
          id="username"
          type="text"
          value={userName}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password:
          <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>  
  )  
}
export default LoginForm