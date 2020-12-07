import React from 'react'

const AddNewEntry = (props) => {
  return(
    <>
      <form onSubmit={props.addEntry}>
        <div>
          <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
          <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default AddNewEntry
