import styled from 'styled-components';
import { tablet } from '../../responsive';

const Container = styled.div`
  background-color: #fff;
  margin-right: 10px;
  height: 80vh;
  width: 75%;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  ${tablet({
    width: '90%',
    height: '60vh',
  })}
`;

const SideBanner = () => {
  return <Container>SideBanner</Container>;
};
export default SideBanner;
