import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = { username: 'testuser' }

const blog = {
  title: 'test blog',
  author: 'tester',
  url: 'testurl',
  likes: 666,
  user: user
}

let component
let blogObject
const likeHandler = jest.fn()

const makeBlog = () => {
  component = render(
    <Blog blog={blog} user={user} likeBlog={likeHandler}/>
  )
  blogObject = component.container.querySelector('.blog')
}

describe('compact blog layout', () => {

  beforeEach(() => {
    makeBlog()
  })

  test('renders title and author', () => {
    expect(blogObject).toHaveTextContent(blog.title)
    expect(blogObject).toHaveTextContent(blog.author)
  })

  test('doesn\'t render url or likes', () => {
    expect(blogObject).not.toHaveTextContent(blog.url)
    expect(blogObject).not.toHaveTextContent(blog.likes)
  })
})

describe('expanded blog layout', () => {

  beforeEach(() => {
    makeBlog()
    const expandButton = component.container.querySelector('.expand-button')
    fireEvent.click(expandButton)
  })

  test('renders url and likes', () => {
    expect(blogObject).toHaveTextContent(blog.url)
    expect(blogObject).toHaveTextContent(blog.likes)
  })

  test('like button calls event handler for each click' , () => {
    const likeButton = component.container.querySelector('.like-button')
    for (let i=0; i<2; i++) {
      fireEvent.click(likeButton)
    }
    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})

