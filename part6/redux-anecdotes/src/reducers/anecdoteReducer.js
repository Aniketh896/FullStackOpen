import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({  
  name: 'anecdoteReducer',  
  initialState: [],  
  reducers: {    
    incrementVotes(state, action) {      
      const id = action.payload      
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes : anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )   
    },
    
    appendAnecdote(state, action) {      
      state.push(action.payload)    
    },

    setAnecdotes(_state, action) {      
      return action.payload    
    }
  },
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()    
    dispatch(setAnecdotes(anecdotes))  
  }
}

export const createAnecdote = content => {  
  return async dispatch => {    
    const newAnecdote = await anecdoteService.createNew(content)    
    dispatch(appendAnecdote(newAnecdote))  
  }
}

export const incrementVotes = id => {  
  return async dispatch => {    
    await anecdoteService.incrementOne(id)
    const anecdotes = await anecdoteService.getAll()      
    dispatch(setAnecdotes(anecdotes)) 
  }
}

export default anecdoteSlice.reducer