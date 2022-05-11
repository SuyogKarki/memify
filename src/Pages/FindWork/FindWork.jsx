import styled from 'styled-components';
import { Job, SideBanner } from '../../Components';
import { mobile } from '../../responsive';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 100px;
  width: 100%;
  ${mobile({
    padding: '15px 0',
  })}
`;
const TopPart = styled.div`
  /* width: 100%;
  margin-top: 15px;
  font-size: 20px;
  font-family: var(--font-title);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; */
`;
const BottomPart = styled.div`
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

const jobs = [
  {
    id: '1',
    title: 'Test Job 1',
    price: '100',
    desc: 'This is a test job',
    Proposals: 20,
  },
  {
    id: '2',
    title: 'Test Job 1',
    price: '100',
    desc: 'This is a test job',
    Proposals: 20,
  },
  {
    id: '3',
    title: 'Test Job 1',
    price: '100',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim minus nam voluptatum placeat commodi sed ullam. Ipsum, quisquam? Ex impedit ratione voluptatum? Quam iusto illum nihil culpa esse maxime! Libero rem voluptatem facilis, nemo pariatur, sapiente quidem impedit ut velit corrupti harum, fugit repudiandae earum reiciendis non officia maiores repellendus architecto eligendi mollitia animi dolores debitis maxime! Eius corporis ullam praesentium nobis architecto minus placeat! Mollitia, sequi ipsa odio enim, repudiandae iste, tempore labore hic voluptates harum natus in. Quasi, consectetur deleniti neque illum ad inventore dignissimos nostrum officia exercitationem, suscipit dolores commodi laborum! Cupiditate aut eveniet quam possimus illum.',
    Proposals: 20,
  },
  {
    id: '4',
    title: 'Test Job 1',
    price: '100',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, provident. Consectetur aut nesciunt earum magnam natus nobis labore? Animi harum laudantium quas cum dolorem officiis, consequatur eaque voluptatum facilis fuga?',
    Proposals: 20,
  },
];

const FindWork = () => {
  return (
    <Container>
      <TopPart></TopPart>
      <BottomPart>
        <Left>
          {jobs.map(job => (
            <Job key={job.id} {...job} />
          ))}
        </Left>
        <Right>
          <SideBanner />
        </Right>
      </BottomPart>
    </Container>
  );
};
export default FindWork;
