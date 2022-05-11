import styled from 'styled-components';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { GoVerified } from 'react-icons/go';
import { Avatar } from '..';
import { unverifiedInstance } from '../../config';
import { mobile } from '../../responsive';

const Container = styled.div`
  padding: 60px 100px;
  width: 100%;
  height: 100%;
  ${mobile({
    padding: '60px 20px',
  })}
`;
const Wrapper = styled.div`
  height: 100%;
  width: 80%;
  ${mobile({
    width: '100%',
  })}

  h1 {
    font-family: var(--font-title);
    font-weight: 600;
    margin-bottom: 40px;
    ${mobile({
      fontSize: '24px',
      marginBottom: '20px',
    })}
  }
`;

const Settings = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Item = styled.div`
  flex: 1;
  border-bottom: 1px solid rgba(122, 119, 119, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:last-child {
    border-bottom: none;
  }
  span {
    span {
      margin-left: 5px;
      color: var(--color-primary);
    }
    &:first-child {
      font-family: Calibri;
      font-weight: 400;
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      flex: 1.5;
      display: flex;
      justify-content: flex-start;
      ${mobile({
        fontSize: '20px',
      })}
    }
    &:nth-child(2) {
      flex: 4;
      font-family: Calibri;
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;
      color: #7a7777;
      display: flex;
      align-items: center;
      ${mobile({
        fontSize: '16px',
      })}
    }
    &:last-child {
      flex: 0.5;
      font-family: Calibri;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;
      cursor: pointer;
      color: #41d3bd;
      ${mobile({
        fontSize: '16px',
      })}
    }
  }
`;

const General = ({ setActive, setName, user, setOtpActive, setIsForEmail, appVerifier }) => {
  let number = `+977${user?.contact}`;
  console.log('rendered');
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: response => {},
      },
      auth
    );
  };

  const handlePhoneNumberVerify = e => {
    e.preventDefault();
    console.log(appVerifier);
    !appVerifier && generateRecaptcha();
    appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, number, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
      })
      .catch(error => {
        console.log(error);
      });
    setOtpActive(true);
  };

  const handleEmailVerify = async e => {
    setIsForEmail(true);
    setOtpActive(true);
    await unverifiedInstance.post('/auth/otp', {
      email: user?.email,
    });
  };

  // const handlePhoneNumberVerify = async e => {
  //   e.preventDefault();
  //   const res = await axios.post(
  //     'https://d7networks.com/api/verifier/send',
  //     {
  //       mobile: number,
  //       message: `{code} is your verification code for Memify /n/nThis code will expire in 2 minutes.`,
  //       expiry: 120,
  //     },
  //     {
  //       headers: {
  //         Authorization: 'TOKEN fbed91184bf2c76771dc9c3970b8df22d423fccc',
  //       },
  //     }
  //   );
  // };
  return (
    <Container>
      <Wrapper>
        <h1>General Settings</h1>
        <Settings>
          <Item>
            <span>Avatar</span>
            <span>
              <Avatar size={'48px'} />
            </span>
            <span
              onClick={() => {
                setActive(true);
                setName('avatar');
              }}
            >
              Edit
            </span>
          </Item>
          <Item>
            <span>Username</span>
            <span>{user?.username}</span>
            <span
              onClick={() => {
                setActive(true);
                setName('username');
              }}
            >
              Edit
            </span>
          </Item>
          <Item>
            <span>Email</span>
            <span>
              {user?.email}
              <span>{user?.isEmailVerified && <GoVerified />}</span>
            </span>
            <span onClick={!user?.isEmailVerified ? handleEmailVerify : () => {}}>{user?.isEmailVerified ? 'Verified' : 'Verify'}</span>
          </Item>
          <Item>
            <span>Contact</span>
            <span>
              {user?.contact} <span>{user?.isContactVerified && <GoVerified />}</span>
            </span>

            <span
              // onClick={!user?.isContactVerified ? handlePhoneNumberVerify : () => {}}
              onClick={handlePhoneNumberVerify}
            >
              {user?.isContactVerified ? 'Verified' : 'Verify'}
            </span>
          </Item>
        </Settings>
      </Wrapper>
      <div className='recaptcha-container' id='recaptcha-container'></div>
    </Container>
  );
};
export default General;
