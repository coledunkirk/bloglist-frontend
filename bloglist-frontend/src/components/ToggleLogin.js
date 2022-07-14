import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const ToggleLogin = forwardRef(({ buttonLabelWhenHidden, buttonLabelWhenShown, showLogin, setShowLogin, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setShowLogin(!showLogin)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hide} className="form">
        <Button color="primary" onClick={toggleVisibility}>{buttonLabelWhenHidden}</Button>
      </div>
      <div style={show} className="form">
        {children}
        <Button color="primary" onClick={toggleVisibility}>{buttonLabelWhenShown}</Button>
      </div>
    </div>
  )
})

export default ToggleLogin