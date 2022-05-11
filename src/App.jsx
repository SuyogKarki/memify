import { Navbar } from './Components';
import styled from 'styled-components';
import { FindWork, Home, JobDetail, Login, PostJob, Profile, Register, Settings, Test } from './Pages';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSocket, hideNav, hideResult } from './store/navSlice';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-background);
`;

const App = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const show = useSelector(state => state.nav.show);
  const resultShow = useSelector(state => state.nav.resultShow);
  const [socket, setSocket] = useState(null);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const handleShowClick = () => {
    show && dispatch(hideNav());
    resultShow && dispatch(hideResult());
  };

  useEffect(() => {
    const socket = io('http://localhost:4000');
    dispatch(addSocket(socket));
  }, []);
  useEffect(() => {
    socket?.emit('join', user?._id);
  }, [user?._id, socket]);

  return (
    <Container onClick={handleShowClick}>
      {path !== 'login' && path !== 'register' && <Navbar user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />

        <Route path='/profile/:id' element={<Profile />} />
        {user && (
          <>
            <Route path='/settings/*' element={<Settings />} />
            <Route path='/test' element={<Test />} />
            <Route path='/findwork' element={<FindWork />} />
            <Route path='/postjobs' element={<PostJob />} />
            <Route path='/job/:id' element={<JobDetail />} />
          </>
        )}
      </Routes>
    </Container>
  );
};
export default App;
