import axios from 'axios'

export const login = async (email, password) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  }

  return await axios.post(
    'http://localhost:3001/api/v1/user/login',
    { email, password },
    config
  )
}
