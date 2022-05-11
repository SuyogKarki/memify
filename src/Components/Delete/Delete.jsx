import styled from 'styled-components';

const Container = styled.div`
  padding: 60px 100px;
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  height: 30%;
  width: 70%;
  h1 {
    font-family: var(--font-title);
    font-weight: 600;
    margin-bottom: 40px;
  }
`;

const Settings = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Item = styled.div`
  flex: 1;
  border-bottom: 1px solid rgba(122, 119, 119, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:last-child {
    border-bottom: none;
  }
  span {
    span {
      margin-left: 5px;
      color: var(--color-primary);
    }
    &:first-child {
      font-family: Calibri;
      font-weight: 400;
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      flex: 1.5;
      display: flex;
      justify-content: flex-start;
    }

    &:last-child {
      flex: 0.8;
      font-family: Calibri;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;
      cursor: pointer;
      color: #bc0e1b;
    }
  }
`;

const Security = () => {
  return (
    <Container>
      <Wrapper>
        <h1>Delete your account</h1>
        <Settings>
          <Item>
            <span>Permanently delete your account:</span>
            <span>Delete account</span>
          </Item>
        </Settings>
      </Wrapper>
    </Container>
  );
};
export default Security;
