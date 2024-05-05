import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, Profile, Tasks, Login, Register, Audio } from './pages';

import { useLocation } from 'react-router-dom';

const CheckTokenAndRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/') {
      navigate('/login');
    }
  }, [navigate, location]);

  return null;
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <main>
      <Router>
        <Navbar />
        <CheckTokenAndRedirect />
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/profile' element={<Profile />}/>
          <Route path='/tasks' element={<Tasks />}/>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/audio' element={<Audio />}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App