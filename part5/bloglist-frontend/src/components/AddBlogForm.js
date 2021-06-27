import React, { useState } from 'react'

const AddBlogForm = ({ submitBlog }) => {

  const [blogInputs, setBlogInputs] = useState({
    title: '',
    author: '',
    url: ''
  })

  // handle user input fields
  const handleBlogInputs = e => {
    setBlogInputs({
      ...blogInputs,
      [e.target.name]: e.target.value
    })
  }

  // create blog object, pass back to App's submitBlog func
  const addBlog = (event) => {
    event.preventDefault()
    submitBlog({
      title: blogInputs.title,
      author: blogInputs.author,
      url: blogInputs.url
    })
    // reset input fields
    setBlogInputs({
      title: '',
      author: '',
      url: ''
    })
  }

  return(
    <form id='add-blog-form' onSubmit={addBlog}>
      <div>Title: <input id='blog-title-input' name="title" value={blogInputs.title} onChange={handleBlogInputs} /></div>
      <div>Author: <input id='blog-author-input' name="author" value={blogInputs.author} onChange={handleBlogInputs} /></div>
      <div>URL: <input id='blog-url-input' name="url" value={blogInputs.url} onChange={handleBlogInputs} /></div>
      <button id='submit-blog-button' type="submit">add</button>
    </form>
  )
}

export default AddBlogForm
