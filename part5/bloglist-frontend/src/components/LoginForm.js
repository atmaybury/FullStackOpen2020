import React, { useState } from 'react'

const LoginForm = ({ submitLogin }) => {

  const [loginInputs, setLoginInputs] = useState({
    username: '',
    password: ''
  })

  // update states with user input
  const handleLoginInputs = e => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    })
  }

  // create login object, pass back to App's submitLogin func
  const handleLogin = (event) => {
    event.preventDefault()
    //
    submitLogin({
      username: loginInputs.username,
      password: loginInputs.password
    })
    // reset input fields
    setLoginInputs({
      username: '',
      password: ''
    })
  }

  return (
    <form id='login-form' onSubmit={handleLogin}>
      <h2>login</h2>
      <div>
        username
        <input
          id='username-input'
          type="text"
          name="username"
          value={loginInputs.username}
          onChange={handleLoginInputs}
        />
      </div>
      <div>
        password
        <input
          id='password-input'
          type="text"
          name="password"
          value={loginInputs.password}
          onChange={handleLoginInputs}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

export default LoginForm
