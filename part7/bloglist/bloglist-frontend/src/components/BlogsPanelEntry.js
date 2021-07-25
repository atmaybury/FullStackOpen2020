import React from 'react'
import { Link } from 'react-router-dom'

const BlogsPanelEntry = ({ blog }) => {

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div className='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
    </div>
  )
}
export default BlogsPanelEntry
