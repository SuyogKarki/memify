import { useState } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../store/apiCalls';
import { unverifiedInstance } from '../../config';

const Container = styled.div`
  width: 30%;
  height: 45%;
  position: absolute;
  z-index: 100;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 80px 30px;
  position: relative;
`;
const Title = styled.h1`
  color: var(--color-secondary);
  font-family: var(--font-title);
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  background-color: #f1f1f1;
  color: var(--color-secondary);
  font-family: var(--font-secondary);
  outline: none;
  border: none;
  border-radius: 5px;

  font-size: 16px;
`;

const Submit = styled.button`
  border: none;
  background: var(--color-primary);
  color: #fff;
  padding: 5px 30px;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  border-radius: 4px;
  cursor: pointer;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background-color: #7a77775c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  svg {
    font-size: 24px;
    color: #676666;
    font-weight: bold;
  }
`;

const Otp = ({ setOtpActive, isForEmail }) => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');

  const handleVerify = e => {
    e.preventDefault();
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(result => {
          // User signed in successfully.

          // ...
          update({ isContactVerified: true }, dispatch, user._id).then(setOtpActive(false));
        })
        .catch(error => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log('bad verification code');
        });
    }
  };

  const handleEmailVerify = async e => {
    e.preventDefault();
    if (otp.length === 6) {
      const res = await unverifiedInstance.post('/auth/verify', { otp: parseInt(otp) }).then(setOtpActive(false));

      if (res.status === 200) {
        console.log('Verified successfully');
        update({ isEmailVerified: true }, dispatch, user._id).then(setOtpActive(false));
      } else {
        console.log('Verification failed');
      }
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Enter the OTP</Title>

        <Input placeholder={`Enter the otp`} value={otp} onChange={e => setOtp(e.target.value)} type='number' />

        <Submit onClick={isForEmail ? handleEmailVerify : handleVerify}>Verify</Submit>
        <Close
          onClick={() => {
            setOtpActive(false);
          }}
        >
          <IoMdClose />
        </Close>
      </Wrapper>
    </Container>
  );
};
export default Otp;
