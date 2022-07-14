import { useState } from 'react'
import { TableCell, Button } from '@mui/material'

const ToggleDetails = ({ buttonLabelWhenHidden, buttonLabelWhenShown, children, blog }) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <TableCell style={hide} data-testid='hidden' className="hidden">
        <Button variant="contained" color="info" onClick={toggleVisibility}>{buttonLabelWhenHidden}</Button>
      </TableCell>
      <TableCell style={show} data-testid='shown' className="shown">
        <Button variant="contained" color="info"onClick={toggleVisibility}>{buttonLabelWhenShown}</Button>
        {children}
      </TableCell>
    </>
  )
}

export default ToggleDetails