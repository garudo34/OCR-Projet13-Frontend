import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../features/login/authSlice'
import { userSlice } from '../features/user/userSlice'

let state = {
  auth: {},
  user: {},
}

export const store = configureStore({
  preloadedState: state,
  reducer: combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer,
  }),
})
