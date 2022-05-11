import { v4 } from 'uuid';
import styled from 'styled-components';
import Notification from './Notification';
import { useSelector } from 'react-redux';

const NotificationWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 300px;
  z-index: 300;
`;

const NotificationProvider = props => {
  //   const notifications = [
  //     {
  //       id: v4(),
  //       type: 'Success',
  //       message: 'Hello Motherfucker!',
  //     },
  //     {
  //       id: v4(),
  //       type: 'Error',
  //       message: 'Hello Motherfucker! 2',
  //     },
  //   ];
  const notifications = useSelector(state => state.notification.notifications);
  return (
    <div>
      <NotificationWrapper>
        {notifications.map(notification => (
          <Notification {...notification} key={notification.id} />
        ))}
      </NotificationWrapper>
      {props.children}
    </div>
  );
};
export default NotificationProvider;
