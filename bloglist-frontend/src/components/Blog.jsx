import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [internalBlog, setInternalBlog] = useState(blog)
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'dashed',
    borderWidth: 2,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const likeBlog = () => {
    const updatedBlog = {
      ...internalBlog,
      likes: internalBlog.likes + 1
    }
    setInternalBlog(updatedBlog)
    updateBlog(updatedBlog)
  }
  
  return (
    <div>
      {showDetails
        ?
          <div style={blogStyle}>
            {internalBlog.title} <button onClick={toggleDetails}>Hide details</button><br />
            {internalBlog.url}<br />
            {internalBlog.likes} <button onClick={likeBlog}>Like</button><br />
            {internalBlog.author}<br />
          </div>
        :
          <div style={blogStyle}>
            {internalBlog.title} {internalBlog.author} <button onClick={toggleDetails}>Show details</button>
          </div>  
      }
    </div>
  )
}

export default Blog