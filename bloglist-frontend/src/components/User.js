import { TableRow, TableCell, Button } from '@mui/material'
import { Link } from "react-router-dom"

const User = ({ user }) => {
  const blogArrayLength = user.blogs.length
  return(
    <>
      <TableRow className="blog"> 
        <TableCell>
          <Button 
            color="inherit" 
            size="small" 
            fullwidth="true" 
            style={{padding: 0, minWidth: 0}}
            component={Link} 
            to={`/users/${user.id}`}
          >
            {user.userName}
          </Button>
        </TableCell>
        <TableCell>{blogArrayLength}</TableCell>
      </TableRow>  
    </>
  )
}
 
export default User