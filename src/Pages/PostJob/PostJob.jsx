import styled from 'styled-components';
import { mobile } from '../../responsive';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 100px;
  width: 100%;
  ${mobile({
    padding: '30px 10px',
  })}
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  color: var(--color-secondary);
  padding-right: 30px;
  h1 {
    font-family: var(--font-title);
    font-weight: 500;
    margin-bottom: 15px;
    color: var(--color-primary);

    ${mobile({
      fontSize: '24px',
      marginBottom: '10px',
    })}
  }
  p {
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
    ${mobile({
      fontSize: '12px',
    })}
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  background-color: white;
  width: 50%;
  padding: 20px;
  border-radius: 7px;
  box-shadow: var(--box-shadow);
  ${mobile({
    width: '90%',
    padding: '10px 20px',
  })}
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label {
    font-family: var(--font-primary);
    font-size: 20px;
    margin-bottom: 10px;
    font-family: var(--font-title);
    font-weight: 500;
    color: var(--color-secondary);
    ${mobile({
      fontSize: '16px',
    })}
  }
  input,
  textarea {
    width: 100%;
    outline: none;
    padding: 10px 10px;
    color: var(--color-secondary);
    font-family: var(--font-secondary);
    border: 1px solid var(--color-secondary);
    border-radius: 7px;
    ${mobile({
      fontSize: '12px',
    })}
  }
  input[type='file'] {
    border: 1px dotted var(--color-secondary);
    padding: 10px 5px;
  }
`;

const Submit = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    background-color: var(--color-primary);
    border: none;
    outline: none;
    color: white;
    padding: 10px 20px;
    border-radius: 7px;
    font-family: var(--font-secondary);
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
  }
`;

const PostJob = () => {
  return (
    <Container>
      <Wrapper>
        <Form>
          <Title>
            <h1>Lorem ipsum dolor sit amet consectetur.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quos asperiores nesciunt eaque quas aperiam totam, a ipsa? Pariatur porro nobis amet soluta nostrum distinctio</p>
          </Title>
          <Item>
            <label>Choose a title for your project</label>
            <input type='text' placeholder='e.g. Create me a meme' required />
          </Item>
          <Item>
            <label>Tell us more about the project</label>
            <textarea name='' id='' cols='30' rows='5' style={{ resize: 'none' }} required placeholder='Describe what you want...'></textarea>
          </Item>
          <Item>
            <input type='file' name='' id='' />
          </Item>
          <Item>
            <label>Name your price</label>
            <input type='number' placeholder='e.g. $100' required />
          </Item>
          <Submit>
            <button>Submit</button>
          </Submit>
        </Form>
      </Wrapper>
    </Container>
  );
};
export default PostJob;
