import Blog from './Blog'

const BlogList = ( {blogs} ) =>
  <div>
    {blogs.map(b => <Blog key={b.id} blog={b}/>)}
  </div>

export default BlogList