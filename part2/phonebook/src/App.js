import { useState } from 'react'

const Name = ({ person }) => <> {person.name} {person.number} <br /> </>

const Persons = ({ person }) => {
  return (
    <Name person={person} />
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = persons.find(obj => obj.name === newName)

    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } 
    else if (newName !== '') {
      const nameObject = { name: newName, number: newNumber }
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const personsToShow = newFilter === '' 
    ? persons
    : persons.filter(obj => obj.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={newFilter} onChange={handleFilterChange}/> <br />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> <br />
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {
        personsToShow.map((person) =>
        <Persons key={person.id} person={person} />
      )}
    </div>
  )
}

export default App