import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggle = forwardRef(({ buttonLabelWhenHidden, buttonLabelWhenShown, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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

export default Toggle