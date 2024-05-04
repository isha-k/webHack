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
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Welcome!</h1>
        <form 
          className='w-full flex flex-col gap-7 mt-14'
          >
          <button
           onClick={onButtonClick}
           type="submit"
           className="btn"
           value={loggedIn ? 'Log out' : 'Log in'}
          >Login
          </button>
        </form>
      </div>
    </section>
  )
}

export default Profile