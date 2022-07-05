import { createSlice } from '@reduxjs/toolkit'

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
export default notificationSlice.reducer