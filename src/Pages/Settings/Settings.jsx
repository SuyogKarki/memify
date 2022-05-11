import styled from 'styled-components';
import { useState } from 'react';
import { FaIdCard } from 'react-icons/fa';
import { BsShieldLockFill } from 'react-icons/bs';
import { AiFillLock, AiFillDollarCircle } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { General, Edit, Security, Privacy, Payments, Delete, Otp } from '../../Components';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { mobile } from '../../responsive';

const Container = styled.div`
  height: 86vh;
  padding: 30px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({
    padding: '30px 10px',
    height: '100vh',
  })}
`;

const Wrapper = styled.div`
  width: 100%;
  height: 75vh;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: var(--box-shadow);
  display: flex;
  ${mobile({
    height: '70vh',
  })}
`;

const Leftbar = styled.div`
  flex: 2;
  border-right: 1px solid rgba(122, 119, 119, 0.6);
  padding: 10px 0;

  h1 {
    text-align: center;
    font-family: var(--font-title);
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 39px;
    margin-bottom: 30px;
    ${mobile({
      fontSize: '24px',
      lineHeight: '30px',
      marginBottom: '20px',
    })}
  }
`;

const Items = styled.div`
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Item = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  color: #7a7777;
  border-bottom: 1px solid rgba(122, 119, 119, 0.6);
  padding-bottom: 10px;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  ${mobile({
    paddingLeft: '10px',
  })}
  svg {
    width: 30px;
    height: 30px;
    ${mobile({
      width: '20px',
      height: '20px',
    })}
  }
  span {
    margin-left: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    font-family: Calibri, sans-serif;
    ${mobile({
      fontSize: '16px',
      lineHeight: '20px',
    })}
  }
  &:last-child {
    border-bottom: 1px solid rgba(188, 14, 27, 0.5);
    color: #bc0e1b;
    &:hover {
      background-color: rgba(188, 14, 27, 0.05);
    }
  }
`;
const Rightbar = styled.div`
  flex: 8;
  ${mobile({
    flex: 1,
  })}
`;

const EditContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const EditBackground = styled.div`
  width: 100%;
  height: 100%;
`;

const Settings = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [otpActive, setOtpActive] = useState(false);
  const [name, setName] = useState('');
  const [isForEmail, setIsForEmail] = useState(false);
  const user = useSelector(state => state.user.user);
  const type = useLocation().pathname.split('/')[2];
  let appVerifier = null;
  const renderSwitch = () => {
    switch (type) {
      case 'general':
        return <General setActive={setActive} setName={setName} user={user} appVerifier={appVerifier} />;

      case 'security':
        return <Security />;
      case 'privacy':
        return <Privacy />;
      case 'payments':
        return <Payments />;
      case 'delete':
        return <Delete />;
      default:
        return <General setActive={setActive} setName={setName} user={user} setOtpActive={setOtpActive} setIsForEmail={setIsForEmail} />;
    }
  };
  return (
    <Container>
      <Wrapper>
        <Leftbar>
          <h1>Settings</h1>
          <Items>
            <Item onClick={() => navigate('/settings/general')}>
              <FaIdCard /> <span>General</span>
            </Item>
            <Item onClick={() => navigate('/settings/security')}>
              <BsShieldLockFill /> <span>Security</span>
            </Item>
            <Item onClick={() => navigate('/settings/privacy')}>
              <AiFillLock /> <span>Privacy</span>
            </Item>
            <Item onClick={() => navigate('/settings/payments')}>
              <AiFillDollarCircle /> <span>Payments</span>
            </Item>
            <Item onClick={() => navigate('/settings/delete')}>
              <BiTrash /> <span>Delete Account</span>
            </Item>
          </Items>
        </Leftbar>
        <Rightbar>{renderSwitch()}</Rightbar>
        {active && (
          <EditContainer>
            <EditBackground onClick={() => setActive(false)}></EditBackground>
            <Edit setActive={setActive} name={name} user={user} />
          </EditContainer>
        )}
        {otpActive && (
          <EditContainer>
            <EditBackground onClick={() => setOtpActive(false)}></EditBackground>
            <Otp setOtpActive={setOtpActive} isForEmail={isForEmail} />
          </EditContainer>
        )}
      </Wrapper>
    </Container>
  );
};
export default Settings;
