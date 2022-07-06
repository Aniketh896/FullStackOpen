import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notificationReducer
  if (notification === null) {
    return null
  }
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    anecdoteReducer: state.anecdoteReducer,
    notificationReducer: state.notificationReducer
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification