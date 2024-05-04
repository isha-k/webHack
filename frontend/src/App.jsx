import React from 'react'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Home, Profile, Tasks } from './pages'

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/tasks' element={<Tasks />}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App