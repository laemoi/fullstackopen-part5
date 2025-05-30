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
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(`An error occured while logging in: ${error}`)
    }
  }

  return (
    <div>
      {user
        ?
          <div>
            <h2>Blogs</h2>
            <div>
              <p>{user.name} is logged in.</p>
              <BlogList blogs={blogs}/>
            </div>
          </div>
        : renderLoginForm()
      }
    </div>
  )
}

export default App