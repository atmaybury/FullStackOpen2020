import React from 'react'
import { useSelector } from 'react-redux'
import BlogsPanelEntry from './BlogsPanelEntry'

const BlogsPanel = () => {

  const blogs = useSelector(state => state.blogs)

  return(
    <div id='blogs'>
      {blogs.sort((a, b) => (b.likes > a.likes) ? 1 : -1).map(blog =>
        <BlogsPanelEntry key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogsPanel
