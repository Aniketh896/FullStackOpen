import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personsService
    .getAll()   
    .then(initialPersons => setPersons(initialPersons))  
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = persons.find(obj => obj.name === newName)

    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } 
    else if (newName !== '') {
      const nameObject = { name: newName, number: newNumber}
      personsService
        .create(nameObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))    
        })
    }
    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  const handleDeleteOf = (id) => {

    const personFound = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personFound.name} ?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons((persons.filter(person => person.id !== id)))
          setNewName('')
          setNewNumber('')
          setNewFilter('')   
        })
    }
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
        <Persons 
          key={person.id} 
          person={person} 
          handleDelete={() => handleDeleteOf(person.id)}/>
      )}
    </div>
  )
}

export default App