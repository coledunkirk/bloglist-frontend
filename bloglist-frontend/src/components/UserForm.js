import userService from '../services/users'

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
    <form onSubmit={handleNewUser}>
      <h2>Create New User</h2>
      <div>
        username:
          <input
          id="create-username"
          type="text"
          value={userName}
          name="CreateUsername"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password:
          <input
          id="create-password"
          type="password"
          value={password}
          name="CreatePassword"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="user-button">sign up</button>
    </form>
  )
}

export default UserForm