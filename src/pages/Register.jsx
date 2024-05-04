import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const onButtonClick = (e) => {
    e.preventDefault()

    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
    setMessage('')

    // Check if the user has entered all fields correctly
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

    if (password !== password2) {
      setPasswordError('Passwords do not match')
      return
    }

    // Send a POST request to the server
    fetch('http://127.0.0.1:8000/api/user/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, password ,password2})
    })
    .then(response => {
      if (response.ok) {
        setMessage('Registered successfully')
      } else {
        setMessage('Failed to register')
      }
    })
  }

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Register!</h1>
        <form 
          className='w-full flex flex-col gap-7 mt-14'
          onSubmit={onButtonClick}
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
            Name
            <input
              type='text'
              value={name}
              name='name'
              onChange={(ev) => setName(ev.target.value)}
              className='input'
              placeholder='Enter name'
              required
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Password
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
          <label className='text-black-500 font-semibold'>
            Confirm Password
            <input
              type='password'
              value={password2}
              name='password2'
              className='input'
              placeholder='Confirm password'
              onChange={(ev) => setPassword2(ev.target.value)}
              required
            />
          </label>
          <label className="errorLabel">{passwordError}</label>
          <button
           type="submit"
           className="btn"
           value={'Log in'}
          >
            Register
          </button>
          <label className="messageLabel">{message}</label>
        </form>
      </div>
    </section>
  )
}

export default Register