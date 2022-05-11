import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { Meme, SideBanner, SoundPost, Upload } from '../../Components';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config';
import { mobile, tablet } from '../../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../store/apiCalls';

const Container = styled.div`
  padding: 30px 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${tablet({
    padding: '15px 0',
  })}
`;

const AvatarContainer = styled.div`
  height: 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({
    height: 'auto',
    marginBottom: '15px',
  })}
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  filter: drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.25));
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    color: var(--color-secondary);
    width: 60px;
    height: 60px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const BottomContainer = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({
    display: 'none',
  })}
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopPart = styled.div`
  width: 100%;
  margin-top: 15px;
  font-size: 20px;
  font-family: var(--font-title);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BottomPart = styled.div`
  margin-top: 20px;
  display: flex;
  span {
    display: flex;
    align-items: flex-end;
    margin-right: 20px;
    font-size: 18px;
    font-family: var(--font-primary);
    ${mobile({
      fontSize: '14px',
    })}
    div {
      font-size: 20px;
      font-weight: 600;
      ${mobile({
        fontSize: '18px',
      })}
    }
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: -10px;
  right: -30px;
  background-color: var(--color-primary);
  border: none;
  outline: none;
  color: white;
  padding: 10px 15px;
  font-size: 18px;
  font-family: var(--font-secondary);
  border-radius: 7px;
  cursor: pointer;
  ${mobile({
    fontSize: '14px',
    padding: '7px 10px',
    lineHeight: '16px',
    right: '-10px',
    top: '-5px',
  })}
`;

const Profile = () => {
  const id = useLocation().pathname.split('/')[2];
  const userId = JSON.parse(localStorage.getItem('memify-cache-user'))?._id;
  const self = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);
  const [isFollowing, setFollowing] = useState(self?.followings?.includes(id));

  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosInstance(`/posts/user/${id}`);
      setPosts(res.data);
    };
    getPosts();
  }, [id]);

  const getUser = async () => {
    const res = await axiosInstance.get(`/users/find/${id}`);
    setUser(res.data);
  };
  useEffect(() => {
    getUser();
  }, [id]);
  const handleFollow = async () => {
    if (isFollowing) {
      await axiosInstance.put(`/users/${id}/unfollow`);
      setFollowing(false);
      update({ followings: [...self.followings, id] }, self._id, dispatch);
      getUser(id);
    } else {
      await axiosInstance.put(`/users/${id}/follow`);
      setFollowing(true);
      update({ followings: [...self.followings, id] }, self._id, dispatch);
      getUser(id);
    }
  };
  return (
    <Container>
      <AvatarContainer>
        <Avatar>{user?.avatar === '' ? <BsFillPersonFill /> : <img src={user?.avatar} alt='avatar' />}</Avatar>
        <Details>
          <TopPart>
            <span>{user?.username}</span>{' '}
            {id === self._id ? (
              <Link to='/settings' className='link'>
                <EditButton>Edit Profile</EditButton>
              </Link>
            ) : (
              <>
                <EditButton onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</EditButton>
              </>
            )}
          </TopPart>
          <BottomPart>
            <span>
              <div>{user?.posts?.length}</div>&nbsp;posts
            </span>{' '}
            <span>
              <div>{user?.followers?.length}</div>&nbsp;followers
            </span>{' '}
            <span>
              <div>{user?.followings?.length}</div>&nbsp;followings
            </span>
          </BottomPart>
        </Details>
      </AvatarContainer>
      <BottomContainer>
        <Left>
          {self?._id === user?._id && <Upload />}

          {posts?.map(post => (
            <Meme key={post?._id} {...post} />
          ))}
        </Left>
        <Right>
          <SideBanner />
        </Right>
      </BottomContainer>
    </Container>
  );
};
export default Profile;
