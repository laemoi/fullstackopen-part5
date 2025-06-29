import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        Title: <input
          className='title-input'
          type='text'
          name='title'
          value={title}
          onChange={event => setTitle(event.target.value)}
        /><br />
        Author: <input
          className='author-input'
          type='text'
          name='author'
          value={author}
          onChange={event => setAuthor(event.target.value)}
        /><br />
        URL: <input
          className='url-input'
          type='text'
          name='url'
          value={url}
          onChange={event => setUrl(event.target.value)}
        /><br />
        <button className='create-button' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm