import { createSlice } from '@reduxjs/toolkit'
let timeoutID = 0

const initialState = 'This is the initial Notification Message'

const notificationSlice = createSlice({  
  name: 'notificationReducer',  
  initialState,  
  reducers: {    
    notificationChange(_state, action) {
        const message = action.payload
        return message
    },
  },
})

export const { notificationChange } = notificationSlice.actions

export const setNotification = (content, time) => {  
  return async dispatch => {    
    dispatch(notificationChange(content))
    clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
          dispatch(notificationChange(null))
      }, time * 1000)
  }
}

export default notificationSlice.reducer