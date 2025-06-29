import { useState } from 'react'
import { PropTypes } from 'prop-types'

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
            {internalBlog.title} <button type='button' onClick={toggleDetails}>Hide details</button><br />
            {internalBlog.url}<br />
            {internalBlog.likes} <button type='button' onClick={likeBlog}>Like</button><br />
            {internalBlog.author}<br />
            {currentUser.username === internalBlog.user.username &&
              <button type='button' onClick={removeBlog}>Remove</button>
            }
          </div>
        :
          <div style={blogStyle} className='blog-overview'>
            {internalBlog.title} {internalBlog.author} <button type='button' onClick={toggleDetails}>Show details</button>
          </div>
      }
    </div>
  )
}

Blog.propTypes = {
  currentUser: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog