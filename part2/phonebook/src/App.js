import { useState } from 'react'

const Name = ({ person }) => <> {person.name} <br /> </>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = persons.find(obj => obj.name === newName)

    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      const nameObject = { name: newName }
      setPersons(persons.concat(nameObject))
      setNewName('')
    } 
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) =>
        <Name key={person.name} person={person}/>
      )}
    </div>
  )
}

export default App