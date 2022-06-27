/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders title and author by default', () => {
    const blog = {
      title: 'testing',
      author: 'testing author',
      url: 'http://testingurl.com/'
    }

    const { container } = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blogRendered')

    expect(div).toHaveTextContent('testing')
    expect(div).toHaveTextContent('testing author')
    expect(div).not.toHaveTextContent('http://testingurl1.com/')
  })

  test('does not renders url and likes by default', () => {
    const blog = {
      title: 'testing 1',
      author: 'testing author 1',
      url: 'http://testingurl1.com/'
    }

    const { container } = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blogNotRendered')

    expect(div).toHaveTextContent('http://testingurl1.com/')
  })
})