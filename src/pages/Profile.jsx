import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const [profile, setProfile] = useState({})
  const [levelPoints, setLevelPoints] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setLoggedIn(!!token)

    if (token) {
      fetch('http://127.0.0.1:8000/api/user/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setProfile(data))
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('accessToken')

      fetch('http://127.0.0.1:8000/api/task/get_level_points/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setLevelPoints(data))
    } else {
      setLevelPoints({})
    }
  }, [loggedIn])

  const onButtonClick = () => {
    if (!loggedIn) {
      navigate('/login')
    } else {
      localStorage.removeItem('accessToken')
      setLoggedIn(false)
      setProfile({})
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 w-full max-w-lg bg-white shadow-xl rounded-lg flex flex-col items-center text-center space-y-6">
        {loggedIn ? (
          <>
          <img
  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random`}
  alt="User Avatar"
  className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg"
/>
            <h1 className='text-3xl font-bold text-gray-800'>Welcome, {profile.name}!</h1>
            <p className='text-lg text-gray-600'>Email: <b>{profile.email}</b></p>
            <div className='flex justify-between w-full px-6 py-4 bg-gray-100 rounded-lg shadow-inner'>
              <div>
                <p className='text-sm text-gray-700'>Total Points:</p>
                <p className='text-xl text-indigo-500 font-bold'>{levelPoints.total_points}</p>
              </div>
              <div>
                <p className='text-sm text-gray-700'>Level:</p>
                <p className='text-xl text-indigo-500 font-bold'>{levelPoints.level}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className='text-2xl font-bold text-gray-800'>Welcome to Our Platform!</h1>
            <p className='text-lg text-gray-600'>Please log in to view your profile information.</p>
          </>
        )}

        <button
          className='w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300'
          type="button"
          onClick={onButtonClick}
        >
          {loggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </div>
  )
}

export default Profile
