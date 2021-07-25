import React, { useEffect, useRef } from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkLoggedInUser, logout } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import BlogsPanel from './components/BlogsPanel'
import Blog from './components/Blog'
import UsersPanel from './components/UsersPanel'
import User from './components/User'
import Toggleable from './components/Toggleable'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  // check for user token in local storage, sets to state
  useEffect(() => {
    dispatch(checkLoggedInUser())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(initUsers())
      dispatch(initBlogs())
    }
  }, [user])

  // ref to Toggleable.toggleVisibility
  const submitBlogRef = useRef()

  // route matches
  const userIdMatch = useRouteMatch('/users/:id')
  const userById = userIdMatch
    ? users.find(u => u.id === userIdMatch.params.id)
    : null

  const blogIdMatch = useRouteMatch('/blogs/:id')
  const blogById = blogIdMatch
    ? blogs.find(u => u.id === blogIdMatch.params.id)
    : null

  // only show login form if not logged in
  if (user === null) {
    return(
      <div>
        <LoginForm />
        <br />
        <Notification />
      </div>
    )
  }

  // show blogs if logged in
  return (
    <div>

      <div id="nav-menu">
        <Link to='/blogs'>blogs</Link> | <Link to='/users'>users</Link> | logged in as {user.name}
        <button onClick={() => dispatch(logout())}>log out</button>
      </div>

      <Notification />

      <h2>blogs</h2>

      <Switch>

        <Route path="/blogs/:id">
          <Blog blog={blogById} />
        </Route>

        <Route path="/blogs">
          <Toggleable id='toggle-add-blog-form' buttonLabel={'Add blog'} ref={submitBlogRef}>
            <AddBlogForm />
          </Toggleable>
          <BlogsPanel />
        </Route>

        <Route path="/users/:id">
          <User user={userById} />
        </Route>

        <Route path="/users">
          <h2>Users</h2>
          <UsersPanel />
        </Route>

        <Route path="/">
          <Toggleable id='toggle-add-blog-form' buttonLabel={'Add blog'} ref={submitBlogRef}>
            <AddBlogForm />
          </Toggleable>
          <BlogsPanel />
        </Route>

      </Switch>

    </div>
  )
}

export default App
