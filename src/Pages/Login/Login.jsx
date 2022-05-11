import styled from 'styled-components';

import { useState } from 'react';

import { login } from '../../store/apiCalls';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { mobile, tablet } from '../../responsive';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 27%;
  height: 70%;
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
  })}
`;

const Logo = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  font-family: var(--font-primary);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.div`
  flex: 3;
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
  flex: 3;
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
  }
  button {
    display: none;
  }
`;
const ButtonContainer = styled.div`
  flex: 1;
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
  justify-content: space-between;
  div {
    flex: 1;
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    ${mobile({
      fontSize: '12px',
    })}
    span {
      color: #41d3bd;
      cursor: pointer;
    }
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    contact: '',
    password: '',
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login(credentials, dispatch);
  };

  return (
    <Container>
      <Wrapper>
        <Logo>Logo</Logo>
        <Form>
          <h1>Login</h1>
          <Inputs onSubmit={handleSubmit}>
            <input placeholder='Enter your phone number' type='number' value={credentials.contact} name='contact' onChange={handleChange} />
            <input placeholder='Enter your password' type='password' value={credentials.password} name='password' onChange={handleChange} />
            <Links>
              <div>
                <span> Forgot Password?</span>
              </div>
              <div>
                Don't have an account?{' '}
                <span>
                  <Link to='/register' className='link'>
                    Sign Up
                  </Link>
                </span>
              </div>
              <button></button>
            </Links>
          </Inputs>
          <ButtonContainer>
            <button onClick={handleSubmit}>Login</button>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};
export default Login;
