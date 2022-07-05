// import { legacy_createStore as createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteService from './services/anecdotes'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

// export const store1 = createStore(anecdoteReducer)

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(setAnecdotes(anecdotes)))

const store = configureStore({  
  reducer: {    
    anecdoteReducer: anecdoteReducer,
    notificationReducer: notificationReducer
  }
})

export default store