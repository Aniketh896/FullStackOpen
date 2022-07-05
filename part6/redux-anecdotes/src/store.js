// import { legacy_createStore as createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

// export const store1 = createStore(anecdoteReducer)

const store2 = configureStore({  
  reducer: {    
    anecdoteReducer: anecdoteReducer,
    notificationReducer: notificationReducer
  }
})

export default store2