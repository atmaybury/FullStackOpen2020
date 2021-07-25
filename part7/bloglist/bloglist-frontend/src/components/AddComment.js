import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { addComment } from '../reducers/blogReducer'

const AddComment = ({ blogId }) => {

  const dispatch = useDispatch()
  const comment = useField()

  const newComment = async e => {
    e.preventDefault()
    dispatch(addComment(blogId, comment.fields.value))
    comment.reset()
  }

  return (
    <form onSubmit={newComment}>
      Comment: <input {...comment.fields} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddComment
