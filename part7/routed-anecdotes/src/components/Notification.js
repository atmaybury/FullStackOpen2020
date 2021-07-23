import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, success }) => {
  Notification.propTypes = {
    success: PropTypes.bool.isRequired
  }

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

  if (!message) {
    return null
  }

  return(
    <div id='notification' style={{ ...notificationStyle, ...status }}>
      {message}
    </div>
  )
}

export default Notification
