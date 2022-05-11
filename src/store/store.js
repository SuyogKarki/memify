import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
import navReducer from './navSlice';
import notificationReducer from './notificationSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    nav: navReducer,
    notification: notificationReducer,
  },
});
