import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/index'
import { Button } from './styles/Buttons.style'

const AddBlogForm = () => {

  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const submitBlog = (event) => {
    event.preventDefault()
    dispatch(addBlog({
      title: title.fields.value,
      author: author.fields.value,
      url: url.fields.value
    }))
    title.reset()
    author.reset()
    url.reset()
  }

  return(
    <form id='add-blog-form' onSubmit={submitBlog}>
      <div>
        <input { ...title.fields }
          id="blog-title-input"
          placeholder="title"
        />
      </div>
      <div>
        <input
          { ...author.fields }
          id="blog-author-input"
          placeholder="author"
        />
      </div>
      <div>
        <input
          { ...url.fields }
          id="blog-url-input"
          placeholder="url"
        />
      </div>
      <Button id='submit-blog-button' type="submit">add</Button>
    </form>
  )
}

export default AddBlogForm
