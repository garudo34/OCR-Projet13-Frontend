import axios from 'axios'

export const getUserProfile = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return await axios.post(
    'http://localhost:3001/api/v1/user/profile',
    { token },
    config
  )
}

export const updateUserProfile = async (token, firstName, lastName) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return await axios.put(
    'http://localhost:3001/api/v1/user/profile',
    { firstName, lastName },
    config
  )
}
