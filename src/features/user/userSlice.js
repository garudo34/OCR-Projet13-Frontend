import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: null,
    lastName: null,
  },
  reducers: {
    getUserProfile: (state, action) => {
      const { firstName, lastName } = action.payload
      return {
        ...state,
        firstName: firstName,
        lastName: lastName,
      }
    },
    editUserProfile: (state, action) => {
      const { firstName, lastName } = action.payload
      return {
        ...state,
        firstName: firstName,
        lastName: lastName,
      }
    },
  },
})
