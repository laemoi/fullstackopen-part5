import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import BlogForm from './BlogForm'

const createBlog = vi.fn()

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

test('When new blog is created, form event handler should be called with correct parameters', async () => {
  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('.title-input')
  const authorInput = container.querySelector('.author-input')
  const urlInput = container.querySelector('.url-input')
  const createButton = container.querySelector('.create-button')

  const user = userEvent.setup()
  await user.type(titleInput, blogObject.title)
  await user.type(authorInput, blogObject.author)
  await user.type(urlInput, blogObject.url)
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blogObject.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blogObject.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blogObject.url)
})