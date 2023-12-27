import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../services/auth'
import { useNavigate } from 'react-router'
import { setToken } from '../../features/login/authSlice'
import { getUserProfile } from '../../services/user'
import { editUserProfile } from '../../features/user/userSlice'
import './loginForm.css'

export const LoginForm = () => {
  const [inputFields, setInputFields] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const lauchSubmit = async () => {
    try {
      const response = await login(inputFields.username, inputFields.password)
      const token = response.data.body.token
      dispatch(setToken({ token: token }))
      const response2 = await getUserProfile(token)
      const { firstName, lastName } = response2.data.body
      dispatch(editUserProfile({ firstName: firstName, lastName: lastName }))
      setInputFields({ ...inputFields, username: '', password: '' })
      navigate('/profile')
    } catch (err) {
      if (!err.status) {
        console.log('No server response', err)
      } else if (err.status === 400) {
        console.log('Missing email or password')
      } else if (err.status === 401) {
        console.log('Unauthorized')
      } else {
        console.log(err.data?.message)
      }
    }
  }

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validateValues(inputFields))
    setSubmitting(true)
  }

  const validateValues = (inputValues) => {
    let errors = {}

    if (!validateEmail(inputValues.username)) {
      errors.username = 'Enter a valid email address'
    }
    if (inputValues.password.length < 8) {
      errors.password =
        'Your password needs to be between 8 and 30 characters long and contain one letter and a number'
    }
    return errors
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      lauchSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='input-wrapper'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={inputFields.email}
            onChange={handleChange}
          />
          {errors.username && (
            <small className='error'>{errors.username}</small>
          )}
        </div>

        <div className='input-wrapper'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={inputFields.password}
            onChange={handleChange}
          />
          {errors.password && (
            <small className='error'>{errors.password}</small>
          )}
        </div>

        <div className='input-remember'>
          <input type='checkbox' id='remember-me' />
          <label htmlFor='remember-me'>Remember me</label>
        </div>

        <button type='submit' className='sign-in-button'>
          Sign In
        </button>
      </form>
    </div>
  )
}
