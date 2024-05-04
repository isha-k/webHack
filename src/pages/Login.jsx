import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
  setEmailError('')
  setPasswordError('')

  // Check if the user has entered both fields correctly
  if ('' === email) {
    setEmailError('Please enter your email')
    return
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setEmailError('Please enter a valid email')
    return
  }

  if ('' === password) {
    setPasswordError('Please enter a password')
    return
  }

  if (password.length < 7) {
    setPasswordError('The password must be 8 characters or longer')
    return
  }

  // Authentication calls will be made here...
  }

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Welcome!</h1>
        <form 
          className='w-full flex flex-col gap-7 mt-14'
          onClick={onButtonClick}
          >
          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='email'
              value = {email}
              name='email'
              onChange={(ev) => setEmail(ev.target.value)}
              className='input'
              placeholder='Enter e-mail'
              required
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='password'
              value={password}
              name='password'
              className='input'
              placeholder='Enter password'
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
          </label>
          <label className="errorLabel">{passwordError}</label>
          <button
           type="submit"
           className="btn"
           value={'Log in'}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login