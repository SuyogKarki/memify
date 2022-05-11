import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  resultShow: false,
  socket: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    showNav: state => {
      state.show = true;
    },
    hideNav: state => {
      state.show = false;
    },
    showResult: state => {
      state.resultShow = true;
    },
    hideResult: state => {
      state.resultShow = false;
    },
    addSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { showNav, hideNav, showResult, hideResult, addSocket } = navSlice.actions;

export default navSlice.reducer;
