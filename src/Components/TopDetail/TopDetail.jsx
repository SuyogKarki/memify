import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Avatar } from '..';
import { mobile } from '../../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, refresh } from '../../store/notificationSlice';
import { v4 } from 'uuid';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const Details = styled.div`
  flex: 4;
  margin-left: 15px;
`;

const TopPart = styled.div`
  color: var(--color-secondary);
  font: var(--font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  span {
    &:first-child {
      margin-right: 10px;
    }
  }
  ${mobile({
    fontSize: '12px',
  })}
`;
const BottomDetail = styled.h1`
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  ${mobile({
    fontSize: '20px',
  })}
`;

const Button = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  button {
    padding: 10px 30px;
    background-color: ${props => props.c};
    outline: none;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    ${mobile({
      fontSize: '14px',
      padding: '5px 10px',
    })}
  }
`;

const TopDetail = ({ post, setActive }) => {
  const dispatch = useDispatch();
  const id = useSelector(state => state?.user?.user?._id);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.get(`/users/find/${post?.userId}`);
      setUser(res.data);
    };
    getUser();
  }, [post?.userId]);

  const handleDelete = async () => {
    const res = await axiosInstance.delete(`/posts/${id}/${post._id}`);
    console.log(res);
    if (res.status === 200) {
      dispatch(
        addNotification({
          type: 'Success',
          message: 'Post deleted successfully',
          id: v4(),
        })
      );
    } else {
      dispatch(
        addNotification({
          type: 'Error',
          message: 'Something went wrong',

          id: v4(),
        })
      );
    }
    dispatch(refresh());
  };
  return (
    <Top>
      <Link to={`/profile/${user?._id}`} className='link'>
        <Avatar size={'42px'} img={user?.avatar} isDynamic={true} />
      </Link>
      <Details>
        <TopPart>
          <Link to={`/profile/${user?._id}`} className='link'>
            {' '}
            <span>Posted by {user?.username}</span>
          </Link>{' '}
          <span>{moment(post?.createdAt).fromNow()}</span>
        </TopPart>
        <BottomDetail>{post?.title}</BottomDetail>
      </Details>

      {/* <Button c={post?.userId === id ? '#F25656' : '#20a4f3'}>
        <button onClick={post?.userId === id && handleDelete}>{post?.userId === id ? 'Delete' : 'Share'}</button>
      </Button> */}
    </Top>
  );
};
export default TopDetail;
