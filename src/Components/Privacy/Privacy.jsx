import styled from 'styled-components';

const Container = styled.div`
  padding: 60px 100px;
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  height: 50%;
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
      flex: 0.5;
      label {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked {
          & ~ span {
            background-color: var(--color-primary);
            &:after {
              display: block;
            }
          }
        }
      }
      &:hover {
        span {
          background-color: #ccc;
        }
      }
    }
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 7px;
  &:after {
    content: '';
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const Security = () => {
  return (
    <Container>
      <Wrapper>
        <h1>Privacy Settings</h1>
        <Settings>
          {/* <Item>
            <span>Make your account private:</span>
            <span>
              <label>
                <input type='checkbox' />
                <Checkmark></Checkmark>
              </label>
            </span>
          </Item> */}
          <Item>
            <span>Allow people to share your posts:</span>
            <span>
              <label>
                <input type='checkbox' />
                <Checkmark></Checkmark>
              </label>
            </span>
          </Item>
        </Settings>
      </Wrapper>
    </Container>
  );
};
export default Security;
