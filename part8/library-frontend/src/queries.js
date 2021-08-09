import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
  query($genre: String!) {
    allBooks(
      genre: $genre
    ) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) { value }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name,
        born,
        bookCount
      }
      published
      genres
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthYear($name: String!, $born: Int!) {
    editAuthor(
      name: $name
      born: $born
    ) { name, born, bookCount }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
        ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`
