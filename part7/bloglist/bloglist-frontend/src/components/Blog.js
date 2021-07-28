import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import CommentsList from './CommentsList'
import AddComment from './AddComment'
import { Button } from './styles/Buttons.style'

const Blog = ({ blog }) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const deletePost = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      history.push('/')
    }
  }

  if (!blog) {
    return null
  }

  return(
    <div className="blog">
      <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p className="likes">{blog.likes} likes</p>
      <Button className="like-button" onClick={() => dispatch(likeBlog(blog.id))}>like</Button><br/>
      <p>Added by {blog.user.name}</p>
      {blog.user.username === user.username &&
        <Button className="delete-button" onClick={deletePost}>delete</Button>
      }
      <AddComment blogId={blog.id} />
      <CommentsList comments={blog.comments} />
    </div>
  )
}

export default Blog
