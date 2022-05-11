import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { CommentContent } from '..';
import { axiosInstance } from '../../config';
import { mobile } from '../../responsive';
import { addNotification } from '../../store/notificationSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const AddComment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: #7a77771a;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid var(--color-secondary);
    margin: 10px 0;
    height: 30px;
    color: var(--color-secondary);
    font-size: 14px;
    padding: 0 10px;
    ${mobile({
      fontSize: '12px',
      height: '20px',
    })}
  }
  button {
    align-self: flex-end;
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
      lineHeight: '20px',
      padding: '5px 10px',
    })}
  }
  h1 {
    color: var(--color-secondary);
    font-size: 32px;
    font-family: var(--font-title);
    ${mobile({
      fontSize: '24px',
    })}
  }
  p {
    font-size: 14px;
    font-family: var(--font-primary);
    color: var(--color-secondary);
    ${mobile({
      fontSize: '12px',
    })}
    margin-top:15px;

    a {
      color: var(--color-primary);
      font-size: 16px;
      margin: 0 2px;
      font-weight: 500;
    }
  }
`;

const Comment = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user);
  const [input, setInput] = useState({
    userId: user?._id,
    text: '',
    postId: post?._id,
  });
  const [comments, setComments] = useState([]);
  const getComment = async () => {
    const res = await axiosInstance.get(`/posts/comment/get/${post._id}`);
    setComments(res.data);
  };
  useEffect(() => {
    getComment();
  }, [post._id]);

  const handleChange = e => {
    setInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    // e.preventDefault();
    // const res = await axiosInstance.post(`/posts/comment/add/${post._id}`, comment);
    // setComments(res.data);
    // setComment({
    //   userId: user?._id,
    //   comment: '',
    // });
    e.preventDefault();
    await axiosInstance.post(`/comments/add`, input).then(
      dispatch(
        addNotification({
          type: 'Success',
          message: 'Comment added successfully',
          id: v4(),
        })
      )
    );
    setInput({
      userId: user?._id,
      comment: '',
      postId: post?._id,
    });
    getComment();
  };
  return (
    <Container>
      <AddComment>
        <h1>{user ? 'Leave a comment' : 'You are not Signed in'}</h1>
        {!user && (
          <p>
            You need to{' '}
            <Link to='/register' className='link'>
              sign up
            </Link>{' '}
            or{' '}
            <Link to='/login' className='link'>
              login
            </Link>{' '}
            in order to leave a comment{' '}
          </p>
        )}
        {user && (
          <>
            <input type='text' placeholder={'Enter your comment'} value={input.text} onChange={handleChange} name={'text'} />
            <button onClick={handleSubmit}>Submit Comment</button>
          </>
        )}
      </AddComment>
      {comments.map((comment, index) => !comment?.isReply && <CommentContent comment={comment} key={index} id={post._id} getComment={getComment} />)}
    </Container>
  );
};
export default Comment;
