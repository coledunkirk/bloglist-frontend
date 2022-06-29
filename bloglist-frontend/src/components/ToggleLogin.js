import { useState, forwardRef, useImperativeHandle } from 'react'

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
      <div style={hide}>
        <button onClick={toggleVisibility}>{buttonLabelWhenHidden}</button>
      </div>
      <div style={show}>
        {children}
        <button onClick={toggleVisibility}>{buttonLabelWhenShown}</button>
      </div>
    </div>
  )
})

export default ToggleLogin