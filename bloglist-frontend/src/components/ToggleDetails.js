import { useState } from 'react'

const ToggleDetails = ({ buttonLabelWhenHidden, buttonLabelWhenShown, children, blog }) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hide} data-testid='hidden' className="hidden">
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>{buttonLabelWhenHidden}</button>
      </div>
      <div style={show} data-testid='shown' className="shown">
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>{buttonLabelWhenShown}</button>
        {children}
      </div>
    </div>
  )
}

export default ToggleDetails