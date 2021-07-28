import usersService from '../services/users'

export const initUsers = () => {
  return async dispatch => {
    try {
      const users = await usersService.getUsers()
      dispatch({
        type: 'INIT_USERS',
        data: users
      })
    } catch (error) {
      console.log(error)
    }
  }
}

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export default userReducer
