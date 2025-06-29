import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('By default, only blog title and author are rendered', () => {
  const blogObject = {
    title: 'Testing blogs on the frontend',
    url: 'test.org',
    likes: 0,
    author: 'Tester'
  }

  const mockUser = {
    name: 'Teemu',
    username: 'teemutester',
    token: 'mockTocken'
  }

  const updateBlog = vi.fn()

  const deleteBlog = vi.fn()

  const { container } = render(<Blog
    currentUser={mockUser}
    blog={blogObject}
    updateBlog={updateBlog}
    deleteBlog={deleteBlog}
  />)

  screen.debug()
  const div = container.querySelector('.blog-overview')
  expect(div).toHaveTextContent(`${blogObject.title} ${blogObject.author}`)
  expect(div).not.toHaveTextContent(`${blogObject.url} ${blogObject.likes}`)
})