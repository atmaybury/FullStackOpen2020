import blogsService from '../services/blogs'
import { notify } from './notificationReducer'

const initialstate = []

export const initBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogsService.getAll()
      console.log(blogs)
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (error) {
      dispatch(notify(false, 'error fetching blogs from server', 5))
    }
  }
}

export const addBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogsService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      dispatch(notify(true, `new blog added: ${blog.title}`, 5))
    } catch (error) {
      dispatch(notify(false, `error: ${error.response.data.error}`, 5))
    }
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    try {
      await blogsService.deleteBlog(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    } catch (error) {
      dispatch(notify(false, 'error deleting blog', 5))
    }
  }
}

export const likeBlog = id => {
  return async dispatch => {
    try {
      const likedBlog = await blogsService.like(id)
      dispatch({
        type: 'LIKE_BLOG',
        data: likedBlog
      })
    } catch (error) {
      dispatch(notify(false, 'couldn\'t like this blog', 5))
    }
  }
}

export const addComment = (blogId, comment) => {

  return async dispatch => {
    try {
      const updatedBlog = await blogsService.addComment(blogId, comment)
      dispatch({
        type: 'ADD_COMMENT',
        data: updatedBlog
      })
    } catch (error) {
      dispatch(notify(false, 'couldn\'t add comment', 5))
    }
  }
}

const blogReducer = (state = initialstate, action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [ ...state, action.data ]
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data)
    case 'LIKE_BLOG':
      return state.map(b => b.id === action.data.id ? action.data : b)
    case 'ADD_COMMENT':
      return state.map(b => b.id === action.data.id ? action.data : b)
    default:
      return state
  }
}

export default blogReducer
