import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material'
import User from './User'

const UserPage = ({ users }) => {
  return(
    <>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow> 
              <TableCell><b>User</b></TableCell>
              <TableCell><b>Blogs Created</b></TableCell>
            </TableRow>
            {users.map(user =>
              <User 
                key={user.id} 
                user={user} 
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    )
}

export default UserPage