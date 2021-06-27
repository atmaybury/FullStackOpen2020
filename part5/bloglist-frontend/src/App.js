import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Toggleable from './components/Toggleable'

const App = () => {

  // ### STATES ###

  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState(true)

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
    // TODO update blog entry by id
    // set state
    setBlogs(blogs.map(n => n.id === blogId ? response : n))
  }

  // remove deleted blog from state
  const removeBlog = (blogId) => {
    console.log(`removing blog ${blogId}`)
    setBlogs(blogs.filter(n => n.id !== blogId))
  }

  // notification panel
  const notify = (success, message) => {
    setNotificationSuccess(success)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
      notify(false, 'wrong credentials')
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
      notify(true, `new blog added: ${newBlog.title} by ${newBlog.author}`)
      updateBlogs()
    } catch (error) {
      notify(false, `error: ${error.response.data.error}`)
    }
  }

  // ### RENDERING ###

  // only show login form if not logged in
  if (user === null) {
    return(
      <div>
        <LoginForm submitLogin={submitLogin} />
        <br />
        <Notification message={notification} success={notificationSuccess} />
      </div>
    )
  }

  // show blogs if logged in
  return (
    <div>
      <Notification message={notification} success={notificationSuccess} />
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
