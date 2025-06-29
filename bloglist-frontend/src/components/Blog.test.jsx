import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Blog from './Blog'

const updateBlog = vi.fn()
const deleteBlog = vi.fn()

const mockUser = {
  name: 'Teemu',
  username: 'teemutester',
  token: 'mockTocken'
}

const blogObject = {
  title: 'Testing blogs on the frontend',
  url: 'test.org',
  likes: 0,
  author: 'Tester',
  user: mockUser
}

test('By default, only blog title and author are rendered', () => {
  const { container } = render(<Blog
    currentUser={mockUser}
    blog={blogObject}
    updateBlog={updateBlog}
    deleteBlog={deleteBlog}
  />)

  const div = container.querySelector('.blog-overview')
  expect(div).toHaveTextContent(`${blogObject.title} ${blogObject.author}`)
  expect(div).not.toHaveTextContent(`${blogObject.url} ${blogObject.likes}`)
})

test('Blog details are shown after \'Show details\' button has been clicked ', async () => {
  const { container } = render(<Blog
    currentUser={mockUser}
    blog={blogObject}
    updateBlog={updateBlog}
    deleteBlog={deleteBlog}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('Show details')
  await user.click(button)

  const div = container.querySelector('.blog-details')
  expect(div).toHaveTextContent(`${blogObject.url}`)
  expect(div).toHaveTextContent(`${blogObject.likes}`)
})