import styled from 'styled-components';

const Container = styled.div`
  width: 30%;
  height: 30%;
  position: absolute;
  z-index: 100;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 30px;
  padding-bottom: 50px;
  position: relative;
  h1 {
    color: var(--color-secondary);
    font-family: var(--font-title);
  }
`;

const Buttons = styled.div`
  button {
    margin-right: 10px;
    border: none;
    background: var(--color-primary);
    color: #fff;
    padding: 5px 30px;
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    border-radius: 4px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
      color: #f25656;
    }
  }
`;

const DeleteContainer = ({ setActive }) => {
  return (
    <Container>
      <Wrapper>
        <h1>Do you really want to delete this post</h1>

        <Buttons>
          <button onClick={setActive(false)}>Cancel</button>
          <button>Yes</button>
        </Buttons>
      </Wrapper>
    </Container>
  );
};
export default DeleteContainer;
