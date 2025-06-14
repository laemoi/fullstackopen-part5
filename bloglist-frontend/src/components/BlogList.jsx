import Blog from './Blog'

const BlogList = ({ currentUser, blogs, updateBlog, deleteBlog }) =>
  <div>
    {blogs
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(b => <Blog key={b.id} currentUser={currentUser} blog={b} updateBlog={updateBlog} deleteBlog={deleteBlog} />)
    }
  </div>

export default BlogList