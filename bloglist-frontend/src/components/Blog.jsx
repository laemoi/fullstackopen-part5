import { useState } from 'react'

const Blog = ({ currentUser, blog, updateBlog, deleteBlog }) => {
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

  const removeBlog = () => {
    deleteBlog(internalBlog.id)
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
            {currentUser.username === internalBlog.user.username &&
              <button onClick={removeBlog}>Remove</button>
            }
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