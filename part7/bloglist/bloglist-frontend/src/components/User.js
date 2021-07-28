import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  console.log(user)

  if (!user) {
    return null
  }

  return(
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(b => <p key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></p>)}
      </ul>
    </div>
  )
}

export default User
