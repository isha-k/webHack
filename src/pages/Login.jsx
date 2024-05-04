import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  console.log("hi from login page")


  const onButtonClick = async (event) => {
    event.preventDefault();

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

    if (password.length < 2) {
      setPasswordError('The password must be 2 characters or longer')
      return
    }

    const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // If the login was successful, store the access token and navigate to the home page
      localStorage.setItem('accessToken', data.token.access);
      navigate('/');
    } else {
      // If the login failed, show an error message
      setPasswordError(data.msg);
      console.log(data.msg)
    }
  }

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Welcome!</h1>
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
