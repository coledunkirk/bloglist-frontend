import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    allBlogs: [],
    selectedBlog: null
  },
  reducers: {
    newBlog(state, action) {
      const content = action.payload
      return { ...state, allBlogs: state.allBlogs.concat(content) }
    },
    incrementLikes(state, action) {
      const likedBlog = action.payload
      const id = likedBlog.id
      return ({ 
          ...state, 
          allBlogs: state.allBlogs.map(blog => blog.id !== id ? blog : likedBlog) 
        })
    },
    setBlogs(state, action) {
      return { ...state, allBlogs: action.payload }
    },
    removeBlog(state, action) {
      const id = action.payload
      return { ...state, allBlogs: state.allBlogs.filter(blog => blog.id !== id) }
    },
    setSelected(state, action) {
      return { ...state, selectedBlog: action.payload }
    },
    incrementComments(state, action) {
      const commentedBlog = action.payload
      const id = commentedBlog.id
      return ({
        ...state,
        allBlogs: state.allBlogs.map(blog => blog.id !== id ? blog : commentedBlog)
      })
    }
  }
})

export const { newBlog, incrementLikes, setBlogs, removeBlog, setSelected, incrementComments } = blogSlice.actions
export const findBlog = id => {
  return async (dispatch, getState) => {
    const selectedBlog = getState().blogs.allBlogs.find(b => b.id === id)
    dispatch(setSelected(selectedBlog))
  }
}
export default blogSlice.reducer