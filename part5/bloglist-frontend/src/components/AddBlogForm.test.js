import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

test('input forms pass correctly to handler function', () => {
  const mockHandler = jest.fn()

  const component = render(
    <AddBlogForm submitBlog={mockHandler} />
  )

  const testTitle = 'test title'
  const testAuthor = 'test author'
  const testUrl = 'testurl'

  const form = component.container.querySelector('#add-blog-form')
  const title = component.container.querySelector('#blog-title-input')
  const author = component.container.querySelector('#blog-author-input')
  const url = component.container.querySelector('#blog-url-input')

  fireEvent.change(title, {
    target: { value: testTitle }
  })
  fireEvent.change(author, {
    target: { value: testAuthor }
  })
  fireEvent.change(url, {
    target: { value: testUrl }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls[0][0].title).toBe(testTitle)
  expect(mockHandler.mock.calls[0][0].author).toBe(testAuthor)
  expect(mockHandler.mock.calls[0][0].url).toBe(testUrl)
  expect(mockHandler.mock.calls).toHaveLength(1)
})
