import { Button, ButtonGroup, TableContainer, Paper, Table, TableBody } from '@mui/material'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Toggle from './Toggle'

const BlogPage = ({ blogFormRef, addBlog, likeBlog, deleteBlog, user }) => {
  const [sortLikes, setSortLikes] = useState(false)
  const blogs = useSelector(({ blogs }) => blogs.allBlogs)
  const sortedBlogs = useSelector(({ blogs }) => [...blogs.allBlogs].sort((blog1, blog2) => blog2.likes - blog1.likes))
  const blogsToShow = sortLikes ? sortedBlogs : blogs

  return (
  <>
    <Toggle 
      buttonLabelWhenHidden='Add new blog' 
      buttonLabelWhenShown='cancel'
      ref={blogFormRef}
    >
      <BlogForm
        addBlog={addBlog}
      />
    </Toggle>
    <h3>Sort by:</h3>
    <ButtonGroup variant="outlined">
      <Button onClick={() => setSortLikes(false)}>age</Button>
      <Button onClick={() => setSortLikes(true)}>likes</Button>
    </ButtonGroup>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogsToShow.map(blog =>
            <Blog 
              key={blog.id} 
              blog={blog} 
              user={user}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}

export default BlogPage