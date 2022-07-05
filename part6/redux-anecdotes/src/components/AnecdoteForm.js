import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote_input.value
        event.target.anecdote_input.value = ''

        const newAnecdote = await anecdoteService.createNew(content)

        dispatch(createAnecdote(newAnecdote))

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