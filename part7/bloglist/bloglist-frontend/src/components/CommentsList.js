import React from 'react'

const CommentsList = ({ comments }) => {
  return (
    <div>
      {comments.map(c =>
        <p key={c.id}>{c.comment}</p>
      )}
    </div>
  )
}

export default CommentsList
