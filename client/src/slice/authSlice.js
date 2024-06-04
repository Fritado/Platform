import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  token: localStorage.getItem('token') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signUpdata: (state, action) => {
      state.user = action.payload
     // localStorage.setItem('signupData', JSON.stringify(action.payload));
    },

    loginUser: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      //state.token = action.payload.token;
      localStorage.setItem('token', action.payload.data.user.token)
      localStorage.setItem('user', JSON.stringify(action.payload.data.user))
    },

    userToken: (state, action) => {
      state.token = action.payload
    },
    logoutUser: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { loginUser, userToken, logoutUser, signUpdata } = authSlice.actions

export default authSlice.reducer
