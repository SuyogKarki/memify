import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../../config';
import Avatar from '../Avatar/Avatar';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Reply from '../Reply/Reply';
import moment from 'moment';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { addNotification } from '../../store/notificationSlice';
import { v4 } from 'uuid';

const Details = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #7a77771a;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  min-height: 150px;
`;

const CommentDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    margin-left: 10px;
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
    font-family: var(--font-title);
  }
  p {
    align-self: center;
    font-size: 14px;
    margin-left: 10px;
    color: var(--color-secondary);
  }
`;

const Content = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: var(--color-secondary);
  font-family: var(--font-primary);
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 15px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-secondary);
  padding: 5px 0;
  margin-bottom: 5px;
  div {
    margin-right: 15px;
    display: flex;
    align-items: flex-end;
    svg {
      font-size: 20px;
    }
    span {
      font-size: 14px;
      margin-left: 3px;
    }
  }
  input {
    align-self: center;
    width: 80%;
    border: none;
    background-color: transparent;
    outline: none;
    padding: 0 5px;
    border-bottom: 1px solid var(--color-secondary);
    color: var(--color-secondary);
    font-family: var(--font-primary);
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    background-color: var(--color-primary);
    padding: 7px 15px;
    border: none;
    outline: none;
    color: #fff;
    font-family: var(--font-primary);
    border-radius: 7px;
    cursor: pointer;
  }
`;

const SettingsContainer = styled.div`
  position: absolute;
  right: 10px;
  svg {
    cursor: pointer;
    color: var(--color-secondary);
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const Dropdown = styled.ul`
  display: flex;
  position: absolute;
  list-style: none;
  flex-direction: column;
  background-color: #e2e2e2;
  padding: 5px 0;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  right: 0;
  li {
    color: #00171f;
    padding: 5px 10px;
    font-family: var(--font-secondary);
    font-size: 14px;
    cursor: default;
    &:hover {
      background-color: #c8c8c8;
    }
  }
`;

const Update = styled.div`
  width: 100%;
  display: flex;
  input {
    width: 80%;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid var(--color-secondary);
    color: var(--color-secondary);
    padding: 0 5px;
  }
  button {
    background-color: var(--color-primary);
    color: #fff;
    border: none;
    outline: none;
    padding: 5px 10px;
    border-radius: 7px;
    font-family: var(--font-primary);
    cursor: pointer;
    margin-left: 10px;
  }
`;

const CommentContent = ({ comment, id, getComment }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [payload, setPayload] = useState({
    postId: id,
    userId: user?._id,
    text: '',
    isReply: true,
    replyTo: comment?._id,
  });
  const [commenter, setCommenter] = useState(null);
  const [replies, setReplies] = useState([]);
  const [liked, setLiked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [edit, setEdit] = useState(false);
  const [likes, setLikes] = useState(comment?.likes?.length);
  const [updated, setUpdated] = useState({
    text: comment?.text,
  });

  const handleChange = e => {
    setPayload({
      ...payload,
      text: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await axiosInstance.post('/comments/add', payload).then(
      dispatch(
        addNotification({
          type: 'Success',
          message: 'Reply added successfully',
          id: v4(),
        })
      )
    );
    setPayload({
      ...payload,
      text: '',
    });
    getReply();
  };

  const getReply = async () => {
    const res = await axiosInstance.get(`/comments/replies/${comment?._id}`);
    setReplies(res.data);
  };

  const handleDelete = async () => {
    await axiosInstance.delete(`/comments/${comment?._id}`);
    getComment();
    setDropdown(false);
  };

  const handleUpdate = async () => {
    await axiosInstance.put(`/comments/${comment?._id}`, updated);
    getComment();
    setEdit(false);
  };

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      setLikes(prev => prev + 1);
      await axiosInstance.put(`/comments/like/${comment._id}`);
    } else {
      setLiked(false);
      setLikes(prev => prev - 1);
      await axiosInstance.put(`/comments/unlike/${comment._id}`);
    }
  };

  useEffect(() => {
    const getCommenter = async () => {
      const response = await axiosInstance.get(`/users/find/${comment?.userId}`);
      setCommenter(response.data);
    };
    getCommenter();
  }, [comment.userId]);

  useEffect(() => {
    getReply();
  }, [comment._id]);

  useEffect(() => {
    comment?.likes?.includes(user?._id) && setLiked(true);
  }, [comment?.likes, user?._id]);

  return (
    <>
      <Details>
        <CommentDetail>
          <Avatar size={'32px'} img={commenter?.avatar} isDynamic={true} />
          <span>{commenter?.username}</span>
          <p>{moment(comment?.createdAt).fromNow()}</p>
        </CommentDetail>
        <Content>
          {!edit ? (
            comment?.text
          ) : (
            <Update>
              {' '}
              <input type='text' placeholder={comment?.text} value={updated?.text} onChange={e => setUpdated({ text: e.target.value })} />
              <button onClick={handleUpdate}>Submit</button>
            </Update>
          )}
        </Content>
        <ButtonsContainer>
          <div onClick={handleLike}>
            {liked ? <AiFillLike /> : <AiOutlineLike />} <span>{likes}</span>
          </div>
          <div onClick={() => setShowInput(prev => !prev)}>Reply</div>
          {showInput && <input type='text' placeholder='Leave a reply' value={payload.text} onChange={handleChange} name={'text'} />}
        </ButtonsContainer>
        {showInput && (
          <SubmitContainer>
            <button onClick={handleSubmit}>Sumbit</button>
          </SubmitContainer>
        )}
        <SettingsContainer>
          <Wrapper>
            <BsThreeDotsVertical onClick={() => setDropdown(prev => !prev)} />
            {dropdown && (
              <Dropdown>
                {user?._id === comment?.userId ? (
                  <>
                    <li
                      onClick={() => {
                        setEdit(prev => !prev);
                        setDropdown(false);
                      }}
                    >
                      Edit
                    </li>
                    <li onClick={handleDelete}>Delete</li>
                  </>
                ) : (
                  <>
                    <li>Report</li>
                  </>
                )}
              </Dropdown>
            )}
          </Wrapper>
        </SettingsContainer>
      </Details>

      {replies.map(reply => (
        <Reply reply={reply} key={reply?._id} getReply={getReply} />
      ))}
    </>
  );
};
export default CommentContent;
