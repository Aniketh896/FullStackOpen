import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdoteReducer)
    const dispatch = useDispatch()

    const vote = id => {
        dispatch(incrementVotes(id))
        dispatch(notificationChange('Voted'))
        setTimeout(() => {
            dispatch(notificationChange(null))
        }, 5000)
    }

    //sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {anecdotes.map(anecdote =>
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