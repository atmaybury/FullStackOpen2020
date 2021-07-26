import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <div id="nav-menu">
      <Link to='/blogs'>blogs</Link> | <Link to='/users'>users</Link> | logged in as {user.name}
      <button onClick={() => dispatch(logout())}>log out</button>
      <hr />
    </div>
  )
}

export default Header
