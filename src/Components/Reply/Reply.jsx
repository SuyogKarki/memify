import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../../config';
import Avatar from '../Avatar/Avatar';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const Container = styled.div`
  align-self: center;
  width: 90%;
  background-color: #7a77771a;
  display: flex;
  margin: 5px 0;
  padding: 10px 20px;
  border-radius: 7px;
  flex-direction: column;
  position: relative;
`;
const CommentDetail = styled.div`
  display: flex;
  span {
    margin-left: 5px;
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    font-family: var(--font-title);
  }
  p {
    margin-left: 10px;
    font-size: 14px;
    color: var(--color-secondary);
  }
`;

const Content = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: var(--color-secondary);
  font-family: var(--font-primary);
  display: flex;
  span {
    margin-right: 10px;
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
    font-family: var(--font-title);
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
  width: 80%;
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

const Reply = ({ reply, getReply }) => {
  const user = useSelector(state => state.user.user);

  const [commenter, setCommenter] = useState(null);
  const [repliedTo, setRepliedTo] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState({
    text: reply?.text,
  });
  useEffect(() => {
    const getCommenter = async () => {
      const res = await axiosInstance.get(`/users/find/${reply?.userId}`);
      setCommenter(res.data);
    };
    const getRepliedTo = async () => {
      const comment = await axiosInstance.get(`/comments/${reply?.replyTo}`);
      const res = await axiosInstance.get(`/users/find/${comment?.data?.userId}`);

      setRepliedTo(res.data);
    };
    getCommenter();
    getRepliedTo();
  }, [reply?.userId, reply?.replyTo]);

  const handleDelete = async () => {
    await axiosInstance.delete(`/comments/${reply?._id}`);
    getReply();
    setDropdown(false);
  };

  return (
    <Container>
      <CommentDetail>
        <Avatar size={'20px'} img={commenter?.avatar} isDynamic={true} />
        <span>{commenter?.username}</span>
        <p>{moment(reply?.createdAt).fromNow()}</p>
      </CommentDetail>
      <Content>
        <span>@{repliedTo?.username}</span>
        {!edit ? (
          reply?.text
        ) : (
          <Update>
            {' '}
            <input type='text' placeholder={reply?.text} value={updated?.text} onChange={e => setUpdated({ text: e.target.value })} />
            <button>Submit</button>
          </Update>
        )}
      </Content>
      <SettingsContainer>
        <Wrapper>
          <BsThreeDotsVertical onClick={() => setDropdown(prev => !prev)} />
          {dropdown && (
            <Dropdown>
              {user?._id === reply?.userId ? (
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
    </Container>
  );
};
export default Reply;
