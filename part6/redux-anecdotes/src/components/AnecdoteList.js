import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdoteReducer)
  const dispatch = useDispatch()

  const vote = id => {
    const content = anecdotes.find(a => a.id === id).content
    dispatch(incrementVotes(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }
  
  return (
    <div>
      {anecdotes/*.sort((a, b) => b.votes - a.votes)*/.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
          <br />
        </div>
      )}
    </div>
  )
}

export default AnecdoteList