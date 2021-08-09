import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ME, BOOK_ADDED } from './queries'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const me = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (window.localStorage.getItem('loggedInUser')) {
      setToken(window.localStorage.getItem('loggedInUser'))
    }
  }, [token])

  // Subscription gets alert when new book mutation is used anywhere
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      updateCacheWith(newBook)
      console.log(client.readQuery({ query: ALL_BOOKS }))
    }
  })

  // checks for book in cache, otherwise adds it
  const updateCacheWith = (newBook) => {
    const includedIn = (set, obj) => {
      set.map(b => b.id).includes(obj.id)
    }
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, newBook)) {
      console.log('adding to cache')
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(newBook)  }
      })
    } else {
      console.log('already in cache')
    }
  }

  const handleLogout = () => {
    setToken(null)
    window.localStorage.removeItem('loggedInUser')
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
        />

        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
          books={books}
        />
      </div>
    )
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={handleLogout}>log out</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended
        show={page === 'recommended'}
        me={me}
      />

    </div>
  )
}

export default App
