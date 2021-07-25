import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersPanel = () => {

  const users = useSelector(state => state.users)

  return(
    <div id="users">
      {users.map(u =>
        <p key={u.id}><Link to={`/users/${u.id}`}>{u.username}</Link> | <b>{u.blogs.length}</b> blogs created</p>
      )}
    </div>
  )
}

export default UsersPanel
