import { legacy_createStore as createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'

export const store1 = createStore(anecdoteReducer)

const store2 = configureStore({  
  reducer: {    
    anecdoteReducer: anecdoteReducer,
  }
})

export default store2