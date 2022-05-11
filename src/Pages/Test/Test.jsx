import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { addNotification } from '../../store/notificationSlice';

const Test = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState({
    id: '',
    type: '',
    message: '',
  });
  const socket = useSelector(state => state.nav.socket);
  const handleChange = e => {
    setNotification({
      ...notification,
      id: v4(),
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = e => {
    console.log(notification);
    dispatch(addNotification(notification));
  };
  return (
    <>
      <select name='type' onChange={handleChange}>
        <option value=''></option>
        <option value='Success'>Success</option>
        <option value='Error'>Error</option>
      </select>
      <input type='text' name={'message'} value={notification.message} onChange={handleChange} />
      <button onClick={handleSubmit}>Add Notification</button>
    </>
  );
};
export default Test;
