const initialState = {
  message: null
}

let notificationTimer
export const notify = (message, timeout) => {

  return async dispatch => {
    clearTimeout(notificationTimer)

    dispatch({
      type: 'CHANGE_NOTIFICATION',
      message: message
    })

    notificationTimer = setTimeout(() => {
      dispatch({
        type: 'CHANGE_NOTIFICATION',
        message: null
      })
    }, timeout * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_NOTIFICATION':
      return {
        message: action.message
      }
    default:
      return state
  }
}

export default notificationReducer
