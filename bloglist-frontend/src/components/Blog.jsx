import { useState } from 'react'

const Blog = ({ blog }) => {
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
  
  return (
    <div>
      {showDetails
        ?
          <div style={blogStyle}>
            {blog.title} <button onClick={toggleDetails}>Hide details</button><br />
            {blog.url}<br />
            {blog.likes} <button>Like</button><br />
            {blog.author}<br />
          </div>
        :
          <div style={blogStyle}>
            {blog.title} {blog.author} <button onClick={toggleDetails}>Show details</button>
          </div>  
      }
    </div>
  )
}

export default Blog