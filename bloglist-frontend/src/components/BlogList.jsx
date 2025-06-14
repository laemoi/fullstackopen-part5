import Blog from './Blog'

const BlogList = ({ blogs, updateBlog }) =>
  <div>
    {blogs
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(b => <Blog key={b.id} blog={b} updateBlog={updateBlog} />)
    }
  </div>

export default BlogList