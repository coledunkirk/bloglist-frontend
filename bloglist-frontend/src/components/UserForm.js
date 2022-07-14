import userService from '../services/users'
import { TextField, Button } from '@mui/material'

const UserForm = ({
  userName,
  password,
  setUserName, 
  setPassword,  
  setMessage, 
  setMessageClass,
  loginRef
}) => {
  const handleNewUser = async (e) => {
    e.preventDefault()
    try {
      await userService.createUser({
        userName, password
      })
      setMessage(`New user ${userName} added. Please Login`)
      setMessageClass('added')
      setTimeout(() => {
        setMessage(null)
      },  5000)
      setUserName('')
      setPassword('')
      loginRef.current.toggleVisibility()
    } catch (error) {
      setMessageClass('error')
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      },  5000)
    }
  }
  return( 
    <form onSubmit={handleNewUser} className="form">
      <h2 className="login-secondary-text">Create New User</h2>
      <div>
          <TextField
          id="create-username"
          type="text"
          value={userName}
          name="CreateUsername"
          label="New Username"
          onChange={({ target }) => setUserName(target.value)}
          margin="normal"
        />
      </div>
      <div>
          <TextField
          id="create-password"
          type="password"
          value={password}
          label="New Password"
          name="CreatePassword"
          onChange={({ target }) => setPassword(target.value)}
          margin="normal"
        />
      </div>
      <div>
        <Button type="submit" id="user-button">sign up</Button>
      </div>
    </form>
  )
}

export default UserForm