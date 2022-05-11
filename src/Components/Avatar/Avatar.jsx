import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { avatar } from '../../assets';

const Container = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  border: ${props => props.border};
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Avatar = ({ size, img, isDynamic }) => {
  const user = useSelector(state => state.user.user);

  return (
    <Container size={size} border={img === '' || user?.avatar === '' ? '1px solid var(--color-secondary)' : ''}>
      {isDynamic ? <img src={img || avatar} alt='' /> : <img src={user?.avatar || avatar} alt='' />}
    </Container>
  );
};
export default Avatar;
