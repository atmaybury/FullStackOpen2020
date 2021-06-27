import React, { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)
  //const [likes, setLikes] = useState(blog.likes)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const like = async () => {
    likeBlog(blog.id)
  }

  const deletePost = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      blogService.deletePost(blog.id)
      removeBlog(blog.id)
    }
  }

  return(
    <div className='blog' style={blogStyle}>
      <button className='expand-button' onClick={toggleExpanded}>
        { expanded ? '^' : '>' }
      </button> { expanded ? <br/> : '' }
      {blog.title} { expanded ? <br/> : '' } {blog.author}
      {expanded &&
        <div className='expanded'>
          {blog.url}<br/>
          <div className='likes'>{blog.likes}</div>
          <button className='like-button' onClick={like}>like</button><br/>
          {blog.user.username}<br/>
          {(user.username === blog.user.username) &&
            <button className='delete-button' onClick={deletePost}>delete</button>
          }
        </div>
      }
    </div>
  )
}
export default Blog
