const initialState = {
  success: true,
  message: null
}

let notificationTimer
export const notify = (success, message, timeout) => {

  return async dispatch => {
    clearTimeout(notificationTimer)

    dispatch({
      type: 'CHANGE_NOTIFICATION',
      success: success,
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
        success: action.success,
        message: action.message
      }
    default:
      return state
  }
}

export default notificationReducer
