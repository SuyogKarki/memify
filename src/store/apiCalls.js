import { axiosInstance, unverifiedInstance } from '../config';
import { authStart, authSuccess, authError, updateStart, updateError, updateSuccess } from './authSlice';
import { addNotification } from './notificationSlice';
import { v4 } from 'uuid';

export const login = async (user, dispatch) => {
  dispatch(authStart());
  try {
    const res = await unverifiedInstance.post('/auth/login', user);
    console.log(res.data);
    dispatch(authSuccess(res.data));
    window.location.reload(false);
    dispatch(
      addNotification({
        id: v4(),
        type: 'success',
        message: 'Logged in successfully',
      })
    );
  } catch (err) {
    dispatch(authError());
  }
};

export const register = async (user, dispatch) => {
  dispatch(authStart());
  const password = user.password;
  try {
    const res = await unverifiedInstance.post('/auth/register', user);
    dispatch(authSuccess(res.data));
    login({ ...res.data, password }, dispatch);
  } catch (err) {
    dispatch(authError());
  }
};

export const update = async (payload, id, dispatch) => {
  dispatch(updateStart());
  try {
    const res = await axiosInstance.put(`/users/${id}`, payload);
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateError());
  }
};
