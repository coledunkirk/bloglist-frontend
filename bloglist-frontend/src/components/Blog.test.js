import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders blog with title and author by default', () => {
  const blog = {
    title: 'New Blog',
    author: 'Cole',
    url: 'blog.com',
    likes: 0
  }
  
  render(<Blog blog={blog} />)

  const element = screen.getByTestId('hidden')
  expect(element).toHaveTextContent('New Blog Cole')
  expect(element).not.toHaveTextContent('blog.com')
  expect(element).not.toHaveTextContent('0')
})

test('renders blog\'s url and likes when the show details button is clicked', async () => {
  const blog = {
    title: 'New Blog',
    author: 'Cole',
    url: 'blog.com',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('show details')
  await user.click(button)

  const element = screen.getByTestId('shown')
  expect(element).toHaveTextContent('New Blog Cole')
  expect(element).toHaveTextContent('blog.com')
  expect(element).toHaveTextContent('0')
})

test('function to increase likes is called when like button is clicked', async () => {
  const blog = {
    title: 'New Blog',
    author: 'Cole',
    url: 'blog.com',
    likes: 0
  }
  const likeBlog = jest.fn()

  render(<Blog blog={blog} likeBlog={likeBlog} />)

  const user = userEvent.setup()
  const button = screen.getByText('show details')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeBlog.mock.calls).toHaveLength(2)
})

test.only('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const submitButton = screen.getByText('Add new')

  await user.type(inputs[0], 'New Blog' )
  await user.type(inputs[1], 'Cole' )
  await user.type(inputs[2], 'blog.com')
  await user.click(submitButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('New Blog')
  expect(addBlog.mock.calls[0][0].author).toBe('Cole')
  expect(addBlog.mock.calls[0][0].url).toBe('blog.com')
})