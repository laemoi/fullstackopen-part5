import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const renderLoginForm = () =>
    <div>
      <h2>Log in to the application</h2>
      <Notification message={notification} type={notificationType} />
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

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))  
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
      setNotificationType('error')
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotificationType('success')
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('bloglistUser')
    window.location.reload()
  }

  const handleCreateBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.createBlog(blog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setNotification(`A new blog "${blog.title}" by ${blog.author} was added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (error) {
      setNotificationType('error')
      setNotification(`An error occured when trying to create a new blog: ${error}`)
      setTimeout(() => {
        setNotificationType('success')
        setNotification(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      const response = await blogService.updateBlog(updatedBlog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setNotification(`Blog "${updatedBlog.title}" by ${updatedBlog.author} was updated successfully`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (error) {
      setNotificationType('error')
      setNotification(`An error occured when trying to update a blog: ${error}`)
      setTimeout(() => {
        setNotificationType('success')
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user ?
        <div>
          <h2>Blogs</h2>
          <Notification message={notification} type={notificationType} />
          <p>{user.name} is logged in. <button onClick={handleLogout}>Logout</button> </p>
          
          <Togglable buttonLabel={'Show blog creation form'} ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog}/>
          </Togglable>
  
          <h2>Existing blogs</h2>
            <BlogList blogs={blogs} updateBlog={handleUpdateBlog}/>
        </div>
        : renderLoginForm()
      }
    </div>
  )
}

export default App