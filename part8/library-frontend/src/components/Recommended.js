import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Recommended = ({ show, me, books }) => {
  const [recommendations, setRecommendations] = useState(null)
  const [booksByGenre, result] = useLazyQuery(BOOKS_BY_GENRE)
  
  useEffect(() => {
    if (me.data) {
      booksByGenre({ variables: { genre: me.data.me.favoriteGenre } })
    }
  }, [me, books]) //eslint-disable-line

  useEffect(() => {
    if (result.data) {
      setRecommendations(result.data.allBooks)
    }
  }, [result])
    
  if (!show) {
    return null
  }

  if (result.loading) {
      return (
        <div>loading...</div>
      )
    }

  if (result.error || !result.data) {
    return (
      <div>error fetching recommendations</div>
    )
  }

  return (
    <div>
      <p>Books in your favourite genre: <b>{me.data.me.favoriteGenre}</b></p>
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
          {recommendations.map(a =>
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

export default Recommended
