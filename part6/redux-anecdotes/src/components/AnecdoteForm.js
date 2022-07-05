import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = event => {
        event.preventDefault()
        const content = event.target.anecdote_input.value
        event.target.anecdote_input.value = ''
        dispatch(createAnecdote(content))
        dispatch(notificationChange(`you added ${content}`))
        setTimeout(() => {
            dispatch(notificationChange(null))
        }, 5000)
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