import { useRef, useState } from 'react';
import styled from 'styled-components';
import { TopDetail, BottomDetail } from '..';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { axiosInstance } from '../../config';
import { useSelector } from 'react-redux';
import { mobile, tablet } from '../../responsive';
import DeleteContainer from '../DeleteContainer/DeleteContainer';

const Container = styled.div`
  width: 90%;
  background-color: #fff;
  min-height: 60vh;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 50px;
  margin-top: 20px;
  position: relative;
  ${mobile({
    minHeight: '30vh',
    padding: '10px 20px',
    paddingTop: '30px',
  })}
  ${tablet({
    minHeight: '40vh',
    padding: '10px 20px',
    paddingTop: '30px',
  })}
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

const Center = styled.div`
  flex: 12;
`;

const ImgContainer = styled.div`
  height: 400px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: 10px;
    border-radius: 7px;
    cursor: pointer;
  }
  ${mobile({
    height: '300px',
  })}
`;

const ModalContainer = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  padding: 50px 0;
  display: none;
  justify-content: center;
  align-items: center;
  cursor: default !important;
  ${mobile({
    padding: '20px 0',
  })}
  img {
    width: 90%;
    object-fit: contain;
    ${mobile({
      height: '70%',
      width: '95%',
    })}
  }
`;

const EditContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 300;
`;

const EditBackground = styled.div`
  width: 100%;
  height: 100%;
`;

const Meme = post => {
  console.log(post);
  const user = useSelector(state => state.user.user);
  const [bookmarked, setBookmarked] = useState(post?.bookmarks?.includes(user?._id));
  const [active, setActive] = useState(true);
  const modalRef = useRef();
  const openPopup = () => {
    modalRef.current.style.display = 'flex';
    disableScroll();
  };
  const closePopup = () => {
    modalRef.current.style.display = 'none';
    enableScroll();
  };
  const handleBookmark = () => {
    !bookmarked ? axiosInstance.put(`/posts/bookmark/add/${post._id}`) : axiosInstance.put(`/posts/bookmark/remove/${post._id}`);
  };

  let keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  const preventDefaultForScrollKeys = e => {
    if (keys[e.keyCode]) {
      e.preventDefault();
      return false;
    }
  };
  let supportsPassive = false;

  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: () => (supportsPassive = true),
      })
    );
  } catch (e) {}

  let wheelOpt = supportsPassive ? { passive: false } : false;

  let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  const preventDefault = e => {
    e.preventDefault();
  };
  const disableScroll = () => {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('touchmove', preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  };

  const enableScroll = () => {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  };

  return (
    <Container>
      <TopDetail post={post} setActive={setActive} />

      <Center>
        <ImgContainer>
          <img src={post.file} alt='' onClick={openPopup} />
          <ModalContainer ref={modalRef} onClick={closePopup}>
            <img src={post.file} alt='' />
          </ModalContainer>
        </ImgContainer>
      </Center>

      <BottomDetail post={post} />
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
      {active && (
        <EditContainer>
          <EditBackground onClick={() => setActive(false)}></EditBackground>
          <DeleteContainer setActive={setActive} />
        </EditContainer>
      )}
    </Container>
  );
};
export default Meme;
