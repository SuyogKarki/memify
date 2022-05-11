import styled from 'styled-components';

import { BiHide } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { Comment } from '..';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../config';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaCommentAlt, FaRegCommentAlt } from 'react-icons/fa';
import { mobile } from '../../responsive';

const Bottom = styled.div`
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  color: var(--color-secondary);
  ${mobile({
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  })}
`;

const IconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  svg {
    margin-right: 5px;
    font-size: 22px;
    ${mobile({
      fontSize: '16px',
    })}
  }
  span {
    align-self: flex-end;
    font-size: 16px;
    ${mobile({
      fontSize: '12px',
      marginRight: '20px',
    })}
  }
`;

const CommentContainer = styled.div`
  margin-top: 20px;
`;

const BottomDetail = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [likes, setLikes] = useState(post?.likes?.length);
  const user = useSelector(state => state.user.user);
  const [liked, setLiked] = useState(false);
  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      setLikes(prev => prev + 1);
      await axiosInstance.put(`/posts/post/like/${post._id}`);
    } else {
      setLiked(false);
      setLikes(prev => prev - 1);
      await axiosInstance.put(`/posts/post/unlike/${post._id}`);
    }
  };
  useEffect(() => {
    post?.likes?.includes(user?._id) && setLiked(true);
  }, [post?.likes, user?._id]);
  return (
    <Bottom>
      <Container>
        <IconContainer onClick={handleLike}>
          {!liked ? <AiOutlineLike /> : <AiFillLike />} <span>{likes} likes</span>
        </IconContainer>
        <IconContainer onClick={() => setShowComment(prev => !prev)}>
          {!showComment ? <FaRegCommentAlt /> : <FaCommentAlt />} <span>{post?.comments?.length} comments</span>
        </IconContainer>
        <IconContainer>
          <BiHide /> <span>Hide content</span>
        </IconContainer>
      </Container>
      {showComment && (
        <CommentContainer>
          <Comment post={post} />
        </CommentContainer>
      )}
    </Bottom>
  );
};
export default BottomDetail;
