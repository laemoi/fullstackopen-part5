import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const renderLoginForm = () =>
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username: <input type="text" name="Username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
        </div>
        <div>
          Password: <input type="password" name="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        </div>
        <button type="submit">Login</button>  
      </form>
    </div>

    const renderFrontpage = () => 
      <div>
        <h2>Blogs</h2>
          <p>{user.name} is logged in. <button onClick={handleLogout}>Logout</button> </p>
        <h2>Create new blog</h2>
          <form onSubmit={handleFormSubmission}>
            Title: <input type="text" name='title'></input><br />
            Author: <input type="text" name='author'></input><br />
            URL: <input type="text" name='url'></input><br />
            <button type="submit">Create</button>
          </form>
        <h2>Existing blogs</h2>
          <BlogList blogs={blogs}/>
      </div>
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("bloglistUser")
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser)
      blogService.setToken(parsedUser.token)
      setUser(parsedUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(`An error occured while logging in: ${error}`)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('bloglistUser')
    window.location.reload()
  }

  const handleFormSubmission = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formDataObject = Object.fromEntries(formData.entries())

    try {
      const response = await blogService.createBlog(formDataObject)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    } catch (error) {
      console.log(`An error occured while creating a blog: ${error}`)
    }
  }

  return (
    <div>
      {user ? renderFrontpage() : renderLoginForm()}
    </div>
  )
}

export default App