
// tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token:null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // clearToken: (state) => {
    //   state.token = '';
    // },
  },
});

export const { setToken} = tokenSlice.actions;
export const selectToken = (state) => state.token.value;
export default tokenSlice.reducer;
