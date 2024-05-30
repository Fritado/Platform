import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../slice/sidebarSlice';
import authReducer from '../slice/authSlice'
import domainReducer from '../slice/PageSpeedSlice'
import tokenReducer from '../slice/tokenSlice'
import profileReducer from '../slice/ProfileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    domain: domainReducer,
    token: tokenReducer,
    profile:profileReducer,
    sidebar: sidebarReducer,
  },
});

