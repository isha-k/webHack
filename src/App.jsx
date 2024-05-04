import React from 'react'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Home, Profile, Tasks, Login, Register } from './pages'
import { useEffect, useState } from 'react'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/profile' element={<Profile />}/>
          <Route path='/tasks' element={<Tasks />}/>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App