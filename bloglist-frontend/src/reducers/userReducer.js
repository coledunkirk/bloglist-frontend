import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loggedUser(state, action) {
      return action.payload
    },
    logoutUser() {
      return null
    }
  }
})

export const { loggedUser, logoutUser } = userSlice.actions
export const setUser = user => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch(loggedUser(user))
  }
}
export default userSlice.reducer
