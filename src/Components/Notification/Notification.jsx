import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../../store/notificationSlice';
import { AiOutlineClose } from 'react-icons/ai';

const SlideLeft = keyframes`
    0%{margin-left:120%;}
    100%{margin-left:0;}
`;
const SlideRight = keyframes`
    0%{margin-left:0;}
    100%{margin-left:120%;}
`;
const Wrapper = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: ${props => (props.type === 'Error' ? '#F25656' : '#65d266')};
  animation: ${props => (props.exit ? SlideRight : SlideLeft)} 0.8s;
  animation-fill-mode: forwards;
  width: 100%;
  position: relative;
  svg {
    position: absolute;
    right: 7px;
    top: 5px;
    width: 18px;
    height: 18px;
    color: #fff;
    cursor: pointer;
  }
`;

const Message = styled.p`
  margin: 0;
  padding: 10px;
  color: #fff;
  font-size: 14px;
  font-family: var(--font-title);
`;

const Bar = styled.div`
  height: 10px;
  background-color: ${props => (props.type === 'Success' ? '#3EC63F' : '#ff0000')};
  width: ${props => props.width}%;
`;

const Notification = props => {
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [exit, setExit] = useState(false);
  const dispatch = useDispatch();

  const handleStartTimer = () => {
    const timerId = setInterval(() => {
      setWidth(prev => (prev < 100 ? prev + 0.5 : prev));
    }, 25);
    setIntervalID(timerId);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      dispatch(removeNotification(props.id));
    }, 800);
  };

  useEffect(() => {
    width === 100 && handleCloseNotification();
  }, [width]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <Wrapper type={props.type} onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} exit={exit}>
      <Message>{props.message} </Message>
      <Bar type={props.type} width={width}></Bar>
      <AiOutlineClose onClick={handleCloseNotification} />
    </Wrapper>
  );
};
export default Notification;
