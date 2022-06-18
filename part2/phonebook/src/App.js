import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const ConfirmNotification = ({ message }) => {

  const confirmStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={confirmStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [confirmMessage, setConfirmMessage] = useState(null)

  useEffect(() => {
    personsService
    .get()   
    .then(initialPersons => setPersons(initialPersons))  
  }, [])

  const resetAllFields = () => {
    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)

    if (foundPerson !== undefined) {
      if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one ?`)) {

        const changedPerson = { ...foundPerson, number: newNumber }

        personsService
          .update(foundPerson.id, changedPerson)
          .then(returnedNote => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedNote)) 
            resetAllFields()
          })
      }
    } 
    else if (newName !== '') {
      const nameObject = { name: newName, number: newNumber}
      personsService
        .create(nameObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setConfirmMessage(`Added ${newName}`)
          setTimeout(() => {          
            setConfirmMessage(null)
          }, 5000)       
          resetAllFields()
        })
    }
  }

  const handleDeleteOf = (id) => {

    const personFound = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personFound.name} ?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons((persons.filter(person => person.id !== id)))
          resetAllFields()
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

      <ConfirmNotification message={confirmMessage} />

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