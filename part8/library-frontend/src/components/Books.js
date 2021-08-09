import React, { useState, useEffect } from 'react'

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState(null)
  const [filtered, setFiltered] = useState(null)

  let genres = []
  if (books.data) {
    books.data.allBooks.forEach(b => {
      b.genres.forEach(g => {
        if (!genres.includes(g)) {
          genres = genres.concat(g)
        }
      })
    })
  }

  useEffect(() => {
    if (books.data) {
      if (filter) {
        setFiltered(books.data.allBooks.filter(b =>
          b.genres.includes(filter)
        ))
      } else {
        setFiltered(books.data.allBooks)
      }
    }
  }, [filter, books.data])

  if (!show) {
    return null
  }

  if (books.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (books.error || !books.data.allBooks) {
    return (
      <div>error fetching books</div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      {genres.map(g =>
        <button onClick={() => setFilter(g)}>{g}</button>
      )}
      <button onClick={() => setFilter(null)}>all genres</button>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filtered.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    
    </div>
  )
}

export default Books
