import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = (props) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-md w-80">
        <h1 className='text-2xl font-bold mb-4 text-center'>Welcome, {profile.name}!</h1>
<div className='text-center'>
  <b>{profile.email}</b>
</div>  <br></br>      <button
          className='w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none'
          type="button"
          onClick={onButtonClick}
        >
          {loggedIn ? 'Log out' : 'Log in'}
        </button>
        {loggedIn ? (
          <div className="mt-4 text-gray-700">
            <p>Username = <b>{profile.name}</b></p>
            <p>Total Points = <b>{levelPoints.total_points}</b></p>
            <p>Level = <b>{levelPoints.level}</b></p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Profile