import React from 'react'
//import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  /*
  Notification.propTypes = {
    success: PropTypes.bool.isRequired
  }
  */

  const success = useSelector(state => state.notification.success)
  const message = useSelector(state => state.notification.message)

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  const statusStyle = {
    success: { color: 'green' },
    error: { color: 'red' }
  }

  const status = success === true ? statusStyle.success : statusStyle.error

  if (message === null) {
    return null
  }

  return(
    <div id='notification' style={{ ...notificationStyle, ...status }}>
      {message}
    </div>
  )
}

export default Notification
