import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { notify } from './reducers/notificationReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Toggleable from './components/Toggleable'

const App = () => {

  // ### STATES ###

  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  /* ### EFFECT HOOKS ### */

  // check for logged in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // get all blogs and save to state
  useEffect(() => {
    updateBlogs()
  }, [])

  /* ### FUNCTIONS ### */

  // get all blogs from server
  const updateBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  // add like to blog
  const likeBlog = async (blogId) => {
    const response = await blogService.like(blogId)
    console.log(response)
    // set state
    setBlogs(blogs.map(n => n.id === blogId ? response : n))
  }

  // remove deleted blog from state
  const removeBlog = (blogId) => {
    console.log(`removing blog ${blogId}`)
    setBlogs(blogs.filter(n => n.id !== blogId))
  }

  // process login event
  const submitLogin = async (login) => {
    try {
      const user = await loginService.login(login)
      // save user login to local storage
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      // create bearer token for use in blogService
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(notify(false, 'wrong credentials', 5))
    }
  }

  // remove user from localStorage, reload
  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  // ref to Toggleable.toggleVisibility
  const submitBlogRef = useRef()

  // create new blog
  const submitBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog)
      submitBlogRef.current.toggleVisibility()
      dispatch(notify(true, `new blog added: ${newBlog.title} by ${newBlog.author}`, 5))
      updateBlogs()
    } catch (error) {
      dispatch(notify(false, `error: ${error.response.data.error}`, 5))
    }
  }

  // ### RENDERING ###

  // only show login form if not logged in
  if (user === null) {
    return(
      <div>
        <LoginForm submitLogin={submitLogin} />
        <br />
        <Notification />
      </div>
    )
  }

  // show blogs if logged in
  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        logged in as {user.name}
        <button onClick={logout}>log out</button>
      </p>
      <Toggleable id='toggle-add-blog-form' buttonLabel={'Add blog'} ref={submitBlogRef}>
        <AddBlogForm submitBlog={submitBlog} />
      </Toggleable>
      <div id='blogs'>
        {blogs.sort((a, b) => (b.likes > a.likes) ? 1 : -1).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog} removeBlog={removeBlog} />
        )}
      </div>
    </div>
  )
}

export default App
