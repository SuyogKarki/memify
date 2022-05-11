import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsBellFill } from 'react-icons/bs';
import { BiCog } from 'react-icons/bi';
import { Avatar } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { hideNav, showNav, showResult } from '../../store/navSlice';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { mobile, tablet } from '../../responsive';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config';

const Container = styled.div`
  width: 100%;
  height: 14vh;
  background-color: #fff;
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 200;
`;
const LogoContainer = styled.div`
  padding: 0 15px;
  flex: 1;
  ${mobile({
    flex: 0.5,
  })}
  ${tablet({
    flex: 0.2,
  })}
`;
const SearchbarContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  position: relative;

  ${mobile({
    marginTop: '20px',
    flex: 3.5,
    display: props => (props.show ? 'flex' : 'none'),
  })}

  form {
    width: 100%;
    height: 100%;
    input {
      height: 100%;
      width: 90%;
      background-color: #f1f1f1;
      padding: 0 40px;
      font-size: 16px;
      border: none;
      outline: none;
      border-radius: 7px;
      color: var(--color-secondary);
      ${mobile({
        fontSize: '14px',
        padding: '0 25px',
        height: '70%',
      })}
    }
    label {
      position: absolute;
      top: 50%;
      transform: translateY(-40%);
      margin-left: 7px;
      font-size: 24px;
      color: var(--color-secondary);
      ${mobile({
        fontSize: '18px',
        left: '-5px',
        top: '40%',
      })}
    }
  }
`;
const SettingContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  ${mobile({
    flex: 0.5,
    paddingRight: '10px',
  })}
  ${tablet({
    paddingRight: '10px',
  })}
`;

const LoginButton = styled.button`
  border: 1px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  padding: 5px 30px;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  border-radius: 4px;
  margin-right: 20px;
  cursor: pointer;
  ${mobile({
    fontSize: '14px',
    padding: '5px 20px',
    lineHeight: '16px',
  })}
`;
const SignUpButton = styled.button`
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
  ${mobile({
    fontSize: '14px',
    padding: '5px 20px',
    lineHeight: '16px',
  })}
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  ${mobile({
    flex: 0.5,
  })}
  svg {
    font-size: 30px;
    color: var(--color-secondary);

    cursor: pointer;
    ${mobile({
      fontSize: '20px',
      marginRight: '10px',
    })}
  }
  &:last-child {
    position: relative;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  ${tablet({
    display: 'none',
  })}
  span {
    font-family: var(--font-title);
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    margin-left: 10px;
    text-transform: capitalize;
    color: var(--color-secondary);
  }
`;

const ButtonContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
`;

const WorkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1.5;
  align-self: center;
  cursor: pointer;
  margin-right: 10px;
  color: var(--color-secondary);
  margin-right: 30px;
  ${tablet({
    flex: 2,
  })}
`;

const FindWork = styled.div`
  font-family: var(--font-title);
  font-size: 16px;
  font-weight: 400;
  position: relative;
  ${mobile({
    display: 'none',
  })}
  ${tablet({
    fontSize: '14px',
  })}
  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: var(--color-secondary);
    position: absolute;
    left: 50%;
    top: -12px;
    transform: translateX(-50%);
    display: none;
  }
  &:hover::before {
    display: block;
  }
`;

const DropDownContainer = styled.ul`
  margin-top: 10px;
  position: absolute;
  top: 100%;
  display: ${props => (props.show ? 'flex' : 'none')};
  list-style: none;
  width: 100px;
  height: max-content;
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
  padding: 10px 0;
  right: 35%;
  li {
    cursor: pointer;
    text-align: center;
    font-family: var(--font-title);
    width: 100%;
    padding: 10px;
    color: var(--color-secondary);
    ${mobile({
      fontSize: '14px',
    })}
    &:hover {
      background-color: #f1f1f1;
    }
    &:first-child {
      padding: 0;
      padding-left: 10px;
      a {
        padding: 10px 0;
        display: block;
        height: 100%;
        width: 100%;
      }
    }
    ${mobile({
      textAlign: 'start',
    })}
  }
`;

const Li = styled.li`
  display: none;
  ${mobile({
    display: 'block',
  })}
`;

const TabletLi = styled.li`
  display: none;
  ${tablet({
    paddingLeft: 'none',
    display: 'block',
    textAlign: 'center',
  })}
`;

const SearchResult = styled.div`
  width: 40%;
  position: absolute;
  top: 65px;
  right: 10%;
  display: ${props => (props.show ? 'flex' : 'none')};
  ul {
    border-radius: 7px;
    width: 100%;
    height: max-content;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    list-style: none;
  }
  li {
    cursor: pointer;
    text-align: start;
    font-family: var(--font-title);
    width: 100%;
    padding: 10px;
    color: var(--color-secondary);
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
    ${mobile({
      fontSize: '14px',
    })}
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const Triangle = styled.div`
  position: absolute;
  top: -40px;
  right: 30px;
  div {
    width: 40px;
    height: 40px;
    position: relative;
    overflow: hidden;
    /* background-color: black; */

    &:after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: rotate(45deg); /* Prefixes... */
      top: 30px;
      left: 10px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    }
  }
`;

const Text = styled.div`
  padding: 10px 0;
  color: var(--color-secondary);
  text-align: center;
  h1 {
    font-family: var(--font-title);
    margin-bottom: 10px;
    font-size: 24px;
  }
  p {
    font-family: var(--font-primary);
    font-size: 12px;
  }
`;

const Navbar = ({ user }) => {
  const show = useSelector(state => state.nav.show);
  const displayResult = useSelector(state => state.nav.resultShow);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector(state => state.nav.socket);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleDropdown = () => {
    show ? dispatch(hideNav(false)) : dispatch(showNav(true));
  };

  console.log(notifications);

  const handleSearch = async e => {
    e.preventDefault();
    const res = await axiosInstance.get('/users/search/' + query);
    const newData = res.data.filter(item => {
      if (item.username !== user.username) {
        if (item.username.startsWith(query)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    setResult(newData);
    dispatch(showResult());
  };

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
  };

  useEffect(() => {
    socket?.on('getNotification', data => {
      setNotifications(prev => [...prev, data]);
    });
  }, [socket]);

  return (
    <Container>
      <LogoContainer>
        <h1>
          <Link to='/' className='link'>
            Logo
          </Link>
        </h1>
      </LogoContainer>
      <SearchbarContainer show={user ? true : false}>
        <form onSubmit={handleSearch}>
          <label htmlFor='searchbar'>
            <AiOutlineSearch />
          </label>
          <input
            type='text'
            name='search'
            id='searchbar'
            placeholder='Serach Memify.....'
            value={query}
            autoComplete='off'
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
        </form>
        <SearchResult show={displayResult}>
          <ul>
            {result.length !== 0 ? (
              result.map(item => {
                return (
                  <li key={item._id} onClick={() => navigate('/profile/' + item?._id)}>
                    <Avatar size={'40px'} isDynamic={true} img={item?.avatar} /> <span>{item.username}</span>
                  </li>
                );
              })
            ) : (
              <Text>
                <h1>No result</h1>
                <p>Make sure you typed the name correctly</p>
              </Text>
            )}
          </ul>
          <Triangle>
            <div></div>
          </Triangle>
        </SearchResult>
      </SearchbarContainer>
      {!user ? (
        <ButtonContainer>
          <Link to='/login' className='link'>
            <LoginButton>Log in</LoginButton>
          </Link>
          <Link to='/register' className='link'>
            <SignUpButton>Sign up</SignUpButton>
          </Link>
        </ButtonContainer>
      ) : (
        <SettingContainer>
          <WorkContainer>
            <Link to='/findwork' className='link'>
              <FindWork>Find Work</FindWork>
            </Link>
            <Link to='/postjobs' className='link'>
              <FindWork>Post Jobs</FindWork>
            </Link>
          </WorkContainer>
          {/* <IconContainer>
            <BsBellFill />
          </IconContainer> */}

          <Link to={`/profile/${user._id}`} className='link'>
            <AvatarContainer>
              <Avatar size={'32px'} />
              <span>{user?.username}</span>
            </AvatarContainer>
          </Link>
          <IconContainer>
            <BiCog onClick={handleDropdown} />
            <DropDownContainer show={show}>
              <TabletLi>
                <Link className='link' to={`/profile/${user._id}`}>
                  Profile
                </Link>
              </TabletLi>
              <Li>
                <Link className='link' to='/findwork'>
                  Find Work
                </Link>
              </Li>
              <Li>
                <Link className='link' to='/postjobs'>
                  Post Jobs
                </Link>
              </Li>
              <li>
                <Link className='link' to='/settings'>
                  Settings
                </Link>
              </li>
              <li onClick={handleLogout}>Logout</li>
            </DropDownContainer>
          </IconContainer>
        </SettingContainer>
      )}
    </Container>
  );
};
export default Navbar;
