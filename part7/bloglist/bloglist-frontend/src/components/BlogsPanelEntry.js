import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Entry = styled.div`
  padding: 0.5em;
  border: solid;
  border-width: 0.1em;
  border-radius: 0.25em;
  margin: 0.5em 0 0.5em;
`

const BlogsPanelEntry = ({ blog }) => {
  return (
    <Entry className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
    </Entry>
  )
}

export default BlogsPanelEntry
