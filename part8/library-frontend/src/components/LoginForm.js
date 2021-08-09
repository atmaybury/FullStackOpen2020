import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useField } from '../hooks/index'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, show, setPage }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  const username = useField('text')
  const password = useField('text')

  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables: { username: username.fields.value, password: password.fields.value } })
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('loggedInUser', token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  if (!show)
    return (null)

  return(
    <form onSubmit={handleLogin}>
      <div>
        <input { ...username.fields } placeholder="username" />
      </div>
      <div>
        <input { ...password.fields } placeholder="password" />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default LoginForm
