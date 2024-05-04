import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (!loggedIn) {
      navigate('/login'); 
    } 
  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
        <h1 className='card-title text-center'>Welcome!</h1>
        <button
          className='btn btn-primary'
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        >Login</button>
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
    </div>
  )
}

export default Profile