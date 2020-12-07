import React from 'react'

const PersonsList = ({ persons, deleteEntry }) => {
  return(
    <>
      <ul>
        {persons.map((persons, i) => 
          <li key={i}>{persons.name} {persons.number} <button onClick={() => deleteEntry(persons)}>delete</button></li>
        )}
      </ul>
    </>
  )
}

export default PersonsList
