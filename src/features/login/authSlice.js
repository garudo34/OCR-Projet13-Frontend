import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    getToken: (state, action) => {
      const { token } = action.payload
      state.token = token
    },
    logout: (state) => {
      state.token = null
    },
  },
})
