import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'
import { useField } from '../hooks/index'

const Authors = (props) => {

  const authors = useQuery(ALL_AUTHORS)

  const [ setBirthYear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  const born = useField('text')

  const [ selectedAuthor, setSelectedAuthor ] = useState(null)
  const selectAuthor = e => {
    setSelectedAuthor(e.target.value)
  }

  const editAuthor = e => {
    e.preventDefault()
    if (selectedAuthor) {
      setBirthYear({ variables: { 
        name: selectedAuthor,
        born: parseInt(born.fields.value)
      } })
    }
    born.reset()
  }

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (authors.error || !authors.data.allAuthors) {
    console.log(authors.error)
    return (
      <div>error fetching authors</div>
    )
  }

  const authorList = authors.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authorList.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={editAuthor}>
        <h3>Edit Author</h3>
        <div>
          <select name="author-select" onChange={selectAuthor} value={selectedAuthor}>
            <option disabled selected value> -- select an author -- </option>
            {authorList.map(a =>
              <option value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          Born: <input { ...born.fields } />
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors
