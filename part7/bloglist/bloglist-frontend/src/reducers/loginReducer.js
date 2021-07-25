import loginService from '../services/login'

export const setLoggedInUser = user => {
  return {
    type: 'STORE_USER',
    data: user
  }
}
export const login = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    console.log(user)
    dispatch(setLoggedInUser(user))
  }
}

export const logout = () => {
  return async dispatch => {
    console.log('logging out')
    window.localStorage.removeItem('loggedInUser')
    dispatch({ type: 'LOGOUT', action: null })
  }
}

export const checkLoggedInUser = () => {
  return async dispatch => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setLoggedInUser(user))
    }
  }
}

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'STORE_USER':
      return action.data
    default:
      return state
  }
}

export default loginReducer
