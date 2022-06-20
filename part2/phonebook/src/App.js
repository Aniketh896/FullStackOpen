import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import ConfirmNotification from './components/ConfirmNotification'
import ErrorNotification from './components/ErrorNotification'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [confirmMessage, setConfirmMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
          })
          .catch(error => {      
            setErrorMessage(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {          
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== foundPerson.id))    
          })
          resetAllFields()
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
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(error.response.data)
          setTimeout(() => {          
          setErrorMessage(null)
          }, 5000)
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

      <ConfirmNotification message={confirmMessage}/>
      <ErrorNotification message={errorMessage}/>

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