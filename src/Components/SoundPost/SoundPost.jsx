import styled from 'styled-components';
import BottomDetail from '../BottomDetail/BottomDetail';
import TopDetail from '../TopDetail/TopDetail';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { audio } from '../../assets';
import { useState } from 'react';
import { axiosInstance } from '../../config';
import { useSelector } from 'react-redux';
import { mobile } from '../../responsive';

const Container = styled.div`
  width: 90%;
  background-color: #fff;
  height: 30vh;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 50px;
  margin-top: 20px;
  position: relative;
`;

const Center = styled.div`
  flex: 12;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AudioContainer = styled.div`
  width: 100%;
  audio {
    width: 100%;
  }
`;

const Bookmark = styled(BsBookmark)`
  color: #41d3bd;
  font-size: 28px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  ${mobile({
    fontSize: '20px',
    right: '7px',
    top: '7px',
  })}
`;
const BookmarkFill = styled(BsFillBookmarkFill)`
  color: #41d3bd;
  font-size: 28px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  ${mobile({
    fontSize: '20px',
    right: '5px',
    top: '7px',
  })}
`;

const SoundPost = ({ post }) => {
  const user = useSelector(state => state.user.user);
  const [bookmarked, setBookmarked] = useState(post?.bookmarks?.includes(user?._id));
  const [active, setActive] = useState(true);
  const handleBookmark = () => {
    !bookmarked ? axiosInstance.put(`/posts/bookmark/add/${post._id}`) : axiosInstance.put(`/posts/bookmark/remove/${post._id}`);
  };
  return (
    <Container>
      <TopDetail post={post} setActive={setActive} />
      <Center>
        <AudioContainer>
          <audio controls className='audiplay' controlsList='nodownload'>
            <source src={post.file} type='audio/mp3' />
          </audio>
        </AudioContainer>
      </Center>
      <BottomDetail />
      {!bookmarked ? (
        <Bookmark
          onClick={() => {
            setBookmarked(true);
            handleBookmark();
          }}
        />
      ) : (
        <BookmarkFill
          onClick={() => {
            setBookmarked(false);
            handleBookmark();
          }}
        />
      )}
    </Container>
  );
};
export default SoundPost;
