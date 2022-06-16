import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')      
    .then(response => setPersons(response.data))  
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = persons.find(obj => obj.name === newName)

    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } 
    else if (newName !== '') {
      const nameObject = { name: newName, number: newNumber, id: persons.length + 1 }
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

      <Filter 
        newFilter={newFilter}
        handleFilterChange={handleFilterChange} 
      />
      
      <h3>add a new</h3>

      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      {personsToShow.map((person) =>
        <Persons key={person.id} person={person} />
      )}
    </div>
  )
}

export default App