import Blog from './Blog'

const BlogList = ({ blogs, updateBlog }) =>
  <div>
    {blogs.map(b => <Blog key={b.id} blog={b} updateBlog={updateBlog} />)}
  </div>

export default BlogList