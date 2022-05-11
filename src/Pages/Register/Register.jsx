import styled from 'styled-components';
import { useState } from 'react';
import { register } from '../../store/apiCalls';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { mobile, tablet } from '../../responsive';
import { Otp } from '../../Components';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 30%;
  height: 85%;
  background-color: #fff;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  ${mobile({
    width: '80%',
  })}
  ${tablet({
    width: '60%',
    height: '60%',
  })}
`;

const Logo = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  font-family: var(--font-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;
const Form = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  h1 {
    font-family: var(--font-title);
    font-weight: 400;
    font-size: 36px;
    line-height: 44px;
    text-align: center;
  }
`;

const Inputs = styled.form`
  flex: 4;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  input {
    height: 50px;
    padding: 0 20px;
    font-family: var(--font-title);
    background-color: rgba(122, 119, 119, 0.1);
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #7a7777;
    border: none;
    outline: none;
    border-radius: 7px;
    ${mobile({
      fontSize: '16px',
    })}
    &:invalid[focused="true"] {
      & + span {
        display: block;
      }
    }
  }
  button {
    display: none;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: 150px;
    padding: 10px 20px;
    font-family: var(--font-primary);
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    color: white;
    background-color: #41d3bd;
    outline: none;
    border: none;
    border-radius: 7px;
    cursor: pointer;
  }
`;
const Links = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    span {
      color: #41d3bd;
      cursor: pointer;
    }
  }
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

const ErrorMessage = styled.span`
  font-size: 12px;
  padding: 3px;
  color: red;
  display: none;
`;

const Register = () => {
  let appVerifier = null;
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    contact: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otpActive, setOtpActive] = useState(false);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusContact, setFocusContact] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);

  const handleUserChange = e => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneNumberVerify = e => {
    const { confirmPassword, ...info } = user;
    console.log(info);
    register(info, dispatch).then(
      setUser({
        username: '',
        contact: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    );
  };

  return (
    <Container>
      <Wrapper>
        <Logo>Logo</Logo>
        <Form onSubmit={handlePhoneNumberVerify}>
          <h1>Register</h1>
          <Inputs>
            <input
              placeholder='Enter your username'
              type='text'
              value={user.username}
              onChange={handleUserChange}
              name='username'
              required={true}
              pattern='^[A-Za-z0-9 ]{3,10}$'
              onBlur={() => setFocusUsername(true)}
              focused={focusUsername.toString()}
            />
            <ErrorMessage>Username should be 3-10 characters and shouldn't include any special character!</ErrorMessage>
            <input
              placeholder='Enter your contact'
              type='contact'
              value={user.contact}
              onChange={handleUserChange}
              name='contact'
              required={true}
              pattern='^(98)[0-9]{8}$'
              onBlur={() => setFocusContact(true)}
              focused={focusContact.toString()}
            />
            <ErrorMessage>Please enter a valid number</ErrorMessage>
            <input
              placeholder='Enter your Email'
              type='email'
              value={user.email}
              onChange={handleUserChange}
              name='email'
              required={true}
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
              onBlur={() => setFocusEmail(true)}
              focused={focusEmail.toString()}
            />
            <ErrorMessage>Please enter a valid email address</ErrorMessage>
            <input
              placeholder='Enter your password'
              type='password'
              value={user.password}
              onChange={handleUserChange}
              name='password'
              required={true}
              pattern='^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
              onBlur={() => setFocusPassword(true)}
              focused={focusPassword.toString()}
            />
            <ErrorMessage>Password should be 8-20 characters and should include at least 1 letter, 1 number and 1 special character</ErrorMessage>
            <input
              placeholder='Confirm your password'
              type='password'
              value={user.confirmPassword}
              onChange={handleUserChange}
              name='confirmPassword'
              required={true}
              pattern={user.password}
              onBlur={() => setFocusConfirmPassword(true)}
              focused={focusConfirmPassword.toString()}
            />
            <ErrorMessage>Passwords don't match</ErrorMessage>
            <Links>
              <div>
                Already have an account?{' '}
                <span>
                  <Link className='link' to='/login'>
                    Sign in
                  </Link>
                </span>
              </div>
            </Links>
            <button></button>
          </Inputs>
          <ButtonContainer>
            <button onClick={handlePhoneNumberVerify}>Register</button>
          </ButtonContainer>
        </Form>
      </Wrapper>
      {otpActive && (
        <EditContainer>
          <EditBackground onClick={() => setOtpActive(false)}></EditBackground>
          <Otp setOtpActive={setOtpActive} />
        </EditContainer>
      )}
    </Container>
  );
};
export default Register;
