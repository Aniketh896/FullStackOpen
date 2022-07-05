import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote_input.value
    event.target.anecdote_input.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`you added ${content}`, 5))
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name='anecdote_input'/></div>
          <button type="submit">create</button> 
        </form>
        <br />
    </div>
  )
}

export default AnecdoteForm