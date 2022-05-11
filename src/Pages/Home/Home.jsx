import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Meme, Upload, SoundPost, SideBanner } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance, unverifiedInstance } from '../../config';
import { mobile, tablet } from '../../responsive';
import { refreshFalse } from '../../store/notificationSlice';

const Container = styled.div`
  padding: 30px 100px;
  width: 100%;
  display: flex;
  ${mobile({
    padding: '15px 0',
  })}

  ${tablet({
    padding: '15px 0',
  })}
`;

const LeftContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({
    flex: 3,
  })}
`;

const RightContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({
    display: 'none',
  })}
  ${tablet({
    flex: 3,
  })}
`;

const Home = () => {
  const user = useSelector(state => state.user.user);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const refresh = useSelector(state => state?.notifications?.refresh);

  const getRandomFeed = async () => {
    const res = await unverifiedInstance.get('/posts/timeline/random');
    setPosts(res.data);
  };
  const getTimelineFeed = async () => {
    const res = await axiosInstance.get('/posts/timeline/feed');
    setPosts(res.data);
  };
  useEffect(() => {
    if (!user) {
      getRandomFeed();
    } else {
      getTimelineFeed();
    }
  }, [user]);

  useEffect(() => {
    refresh && getTimelineFeed().then(dispatch(refreshFalse()));
  }, [refresh]);

  return (
    <Container>
      <LeftContainer>
        {user && <Upload />}

        {posts.map(post => {
          if (post.type !== 'meme') {
            return <SoundPost key={post._id} {...post} />;
          } else {
            return <Meme key={post._id} {...post} />;
          }
        })}
        {/* <SoundPost /> */}
      </LeftContainer>

      <RightContainer>
        <SideBanner />
      </RightContainer>
    </Container>
  );
};
export default Home;
