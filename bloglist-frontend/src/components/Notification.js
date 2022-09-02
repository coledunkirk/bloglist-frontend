import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => {
    return state.notification.message
  })
  const messageClass = useSelector(state => {
    return state.notification.messageClass
  })
  if (message === null) return null

  return (
    <div className={messageClass}>{message}</div>
  )
}

export default Notification