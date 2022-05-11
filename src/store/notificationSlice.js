import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  refresh: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    },
    refresh: state => {
      state.refresh = true;
    },
    refreshFalse: state => {
      state.refresh = false;
    },
  },
});

export const { addNotification, removeNotification, refresh, refreshFalse } = notificationSlice.actions;
export default notificationSlice.reducer;
