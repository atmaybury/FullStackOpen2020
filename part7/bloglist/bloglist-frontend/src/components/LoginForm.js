import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { login } from '../reducers/loginReducer'
import { useField } from '../hooks/index'
import { Button } from './styles/Buttons.style'

const Input = styled.input`
  margin: 0.25em 0em 0.25em 0em;
  border-radius: 0.25em;
`

const LoginForm = () => {

  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('text')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({
      username: username.fields.value,
      password: password.fields.value
    }))
    username.reset()
    password.reset()
  }

  return (
    <form id='login-form' onSubmit={handleLogin}>
      <h2>login</h2>
      <div>
        <Input { ...username.fields }
          id="username-input"
          placeholder="username"
        />
      </div>
      <div>
        <Input
          { ...password.fields }
          id="password-input"
          placeholder="password"
        />
      </div>
      <Button id='login-button' type="submit">login</Button>
    </form>
  )
}

export default LoginForm
