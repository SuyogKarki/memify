import styled from 'styled-components';
import { Avatar } from '..';
import TopDetail from '../TopDetail/TopDetail';
import { mobile } from '../../responsive';

const Container = styled.div`
  width: 90%;
  background-color: #fff;
  min-height: 20vh;
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
`;
const PostedBy = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;
const Name = styled.h1`
  margin-left: 20px;
  font-size: 20px;
  color: var(--color-secondary);
  font-family: var(--font-title);
`;

const Center = styled.div`
  flex: 1.5;
  margin: 15px 0;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div``;

const Description = styled.p`
  color: var(--color-secondary);
  font-family: var(--font-secondary);
`;

const BottomDetail = styled.div`
  flex: 0.5;
  display: flex;
  color: var(--color-secondary);
  font-weight: 400;
  font-family: var(--font-primary);
`;

const Price = styled.div`
  margin-right: 20px;
  span {
    font-weight: 600;
  }
`;
const Proposals = styled.div`
  span {
    font-weight: 600;
  }
`;

const Job = job => {
  const post = {
    _id: '6270c938e324bba8e8c64f73',
    title: 'test meme 11',
    userId: '625900f3e5fd80e75dee5d04',
    desc: '',
    type: 'meme',
    file: 'https://firebasestorage.googleapis.com/v0/b/memify-8155c.appspot.com/o/items%2F1651558708626filefilememe13.jpg?alt=media&token=36846c5c-4778-4558-ae75-68b14cff4353',
    likes: ['625900f3e5fd80e75dee5d04'],
    comments: [],
    bookmarks: [],
    createdAt: '2022-05-03T06:18:32.267Z',
    updatedAt: '2022-05-05T07:15:51.848Z',
    __v: 0,
  };
  return (
    <Container>
      <TopDetail post={post} />
      <Center>
        <Description>{job.desc}</Description>
      </Center>
      <BottomDetail>
        <Price>
          Price : <span>Rs 200</span>
        </Price>
        <Proposals>
          Proposals: <span>10</span>
        </Proposals>
      </BottomDetail>
    </Container>
  );
};
export default Job;
