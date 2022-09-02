import userService from '../services/users'
import { useDispatch } from 'react-redux'
import { setNotification, setMessageClass } from '../reducers/notificationReducer'
import { TextField, Button } from '@mui/material'

const UserForm = ({
  userName,
  password,
  setUserName, 
  setPassword,  
  loginRef,
  users,
  setUsers
}) => {
  const dispatch = useDispatch()
  const handleNewUser = async (e) => {
    e.preventDefault()
    try {
      const newUser = await userService.createUser({
        userName, password
      })
      dispatch(setMessageClass('added'))
      dispatch(setNotification(`New user ${userName} added. Please Login`, 5))
      setUsers(users.concat(newUser))
      setUserName('')
      setPassword('')
      loginRef.current.toggleVisibility()
    } catch (error) {
      dispatch(setMessageClass('error'))
      dispatch(setNotification(error.response.data.error, 5))
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