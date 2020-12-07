import React, { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import AddNewEntry from './components/AddNewEntry'
import Filter from './components/Filter'
import Notification from './components/Notification'
import axios from 'axios'
import './index.css'
import phonebookService from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ filterResult, setFilterResult ] = useState([])
  const [ notification, setNotification ] = useState(null)
  const [ notificationSuccess, setNotificationSuccess] = useState(true)

  // add entry to db and update state
  const addEntry = (event) => {
    event.preventDefault()
    // create newPerson object
    let newPerson = {
      name: newName,
      number: newNumber
    }
    // if person's name not already in phonebook, create new entry
    if (!persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      phonebookService
        .addPerson(newPerson)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response))
        })
    // else if person's name already in phonebook, update number
    } else {
      let id = persons.find(n => n.name.toLowerCase() === newName.toLowerCase()).id
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        phonebookService
          .updateNumber(id, newPerson)
          .then(response => {
            console.log(response)
            setPersons(persons.map(person => person.id === id ? response : person))
          })
          .catch(error => {
            console.log(error)
            showNotification(`${newName} has already been removed from server`, false)
            setPersons(persons.filter(n => n.id !== id))
          })
      }
    }
    showNotification(`Added ${newName}`, true)
    setNewName('')
    setNewNumber('')
  }

  const showNotification = (message, success) => {
    setNotificationSuccess(success)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  // remove entry from db and update state
  const deleteEntry = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      phonebookService
        .removePerson(person.id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(n => n.id !== person.id))
        })
        .catch(error => {
          console.log(error)
          showNotification(`${person.name} has already been removed`, false)
          setPersons(persons.filter(n => n.id !== person.id))
        })
    }
  }

  // when user inputs to newName field
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // when user inputs to newNumber field
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchInput = (event) => {
    setFilter(event.target.value)
  }

  // get initial data
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log(response)
      setPersons(response.data)
    })
  }, [])

  // update filtered results
  useEffect(() => {
    const results = persons.filter((person) => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })
    if (results !== '') {
      setFilterResult(results)
    } else {
      setFilterResult(persons)
    }
  }, [filter, persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} success={notificationSuccess}/>
      <Filter handleSearchInput={handleSearchInput} value={filter} />
      <h2>Add new listing</h2>
      <AddNewEntry
        addEntry={addEntry}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonsList persons={filterResult} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App
