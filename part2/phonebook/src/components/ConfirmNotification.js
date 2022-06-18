import React from 'react'

const ConfirmNotification = ({ message }) => {

    const confirmStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    if (message === null) {
      return null
    }
  
    return (
      <div style={confirmStyle}>
        {message}
      </div>
    )
}

export default ConfirmNotification