import { List, ListSubheader, ListItemButton, ListItemText } from '@mui/material'
import { Link } from "react-router-dom"

const IndividualUser = ({ selectedUser }) => {
  if (!selectedUser) {
    return null
  }

  return(
    <>
      <h1>{selectedUser.userName}</h1>
      <List subheader={
          <ListSubheader>ADDED BLOGS</ListSubheader>
        }
      >
        {selectedUser.blogs.map(blog => 
          <ListItemButton key={blog.id} component={Link} to={`/blogs/${blog.id}`}>
            <ListItemText primary={blog.title} />
          </ListItemButton>
        )}
      </List>
    </>
    )
}

export default IndividualUser