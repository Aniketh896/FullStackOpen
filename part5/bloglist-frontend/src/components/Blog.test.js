/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogRef from '../App'

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
    expect(div).not.toHaveStyle('display: none')
  })

  test('does not renders url and likes by default', () => {
    const blog = {
      title: 'testing 1',
      author: 'testing author 1',
      url: 'http://testingurl1.com/'
    }

    const { container } = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blogNotRendered')

    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent('http://testingurl1.com/')
  })

  test('renders url and likes after show is clicked', async () => {
    const blog = {
      title: 'testing 1',
      author: 'testing author 1',
      url: 'http://testingurl1.com/'
    }

    const mockHandler = jest.fn()

    const { container } = render(
      <Blog blog={blog} toggleVisibility={mockHandler} />
    )

    const div = container.querySelector('.blogNotRendered')
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(div).toHaveTextContent('http://testingurl1.com/')
    expect(div).toHaveTextContent('0')
    expect(div).not.toHaveStyle('display: none')
  })
  test('has mockHandler called twice when like button is pressed', async () => {
    const blog = {
      title: 'testing 1',
      author: 'testing author 1',
      url: 'http://testingurl1.com/'
    }

    const mockHandler = jest.fn()

    render(
      <input type="button" value='like' onClick={mockHandler} className='button'/>
    )

    const user = userEvent.setup()

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})