import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  messageClass: 'added',
  timeoutID: null
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      const message = action.payload
      return { ...state, message: message }
    },
    setMessageClass(state, action) {
      return { ...state, messageClass: action.payload}
    },
    removeMessage() {
      return initialState
    },
    setTimeoutID(state, action) {
      return {...state, timeoutID: action.payload}
    }
  }
})

export const { setMessage, setMessageClass, removeMessage, setTimeoutID } = notificationSlice.actions
export const setNotification = (message, seconds) => {
  return async (dispatch, getState) => {
    dispatch(setMessage(message))
    const timeoutID = getState().notification.timeoutID
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    dispatch(setTimeoutID(setTimeout(() => {
      dispatch(removeMessage())
      }, seconds * 1000))
    )
  }
}

export default notificationSlice.reducer