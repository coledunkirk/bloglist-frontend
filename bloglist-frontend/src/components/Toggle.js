import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Toggle = forwardRef(({ buttonLabelWhenHidden, buttonLabelWhenShown, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }
  const style= {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={style}>
      <div style={hide}>
        <Button size="large" variant="contained" onClick={toggleVisibility}>{buttonLabelWhenHidden}</Button>
      </div>
      <div style={show}>
        {children}
        <div style={style}>
          <Button color="error" onClick={toggleVisibility}>{buttonLabelWhenShown}</Button>
        </div>
      </div>
    </div>
  )
})

export default Toggle