import React from 'react'

const Notification = ({ message, success }) => {

  const divClass = success === true ? "success" : "error"

  if (message === null) {
    return null
  }

  return(
    <div className={"notification " + divClass}>
      {message}
    </div>
  )
}

export default Notification
