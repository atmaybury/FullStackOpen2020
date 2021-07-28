import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Button } from './styles/Buttons.style'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <div id="nav-menu">
      <Link to='/blogs'>blogs</Link> | <Link to='/users'>users</Link> | logged in as {user.name}
      <Button onClick={handleLogout}>log out</Button>
      <hr />
    </div>
  )
}

export default Header
