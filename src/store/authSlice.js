import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('memify-cache-user')) || null,
  isFetching: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authStart: state => {
      state.isFetching = true;
    },
    authSuccess: (state, action) => {
      localStorage.setItem('memify-cache-user', JSON.stringify(action.payload));
      state.user = action.payload;
      state.isFetching = false;
    },
    authError: state => {
      state.isFetching = false;
      state.error = true;
    },
    updateStart: state => {
      state.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.user = action.payload;
      const token = JSON.parse(localStorage.getItem('memify-cache-user')).accessToken;
      localStorage.setItem('memify-cache-user', JSON.stringify({ ...state.user, accessToken: token }));
      state.isFetching = false;
    },
    updateError: state => {
      state.isFetching = false;
      state.error = true;
    },
    logout: state => {
      state.user = null;
      localStorage.removeItem('memify-cache-user');

      window.location.reload(false);
    },
  },
});

export const { authStart, authSuccess, authError, updateStart, updateSuccess, updateError, logout } = userSlice.actions;

export default userSlice.reducer;
