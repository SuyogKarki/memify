import styled from 'styled-components';
import { MdReportProblem } from 'react-icons/md';
import { mobile } from '../../responsive';

const Conatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 100px;
  width: 100%;
  flex-direction: column;
  ${mobile({
    padding: '30px 15px',
  })}
`;
const Detail = styled.div`
  width: 60%;
  background-color: white;
  padding: 20px 30px;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  ${mobile({
    width: '100%',
    padding: '10px',
  })}
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 10px;
`;

const Name = styled.div`
  font-family: var(--font-title);
  font-weight: 500;
  color: var(--color-secondary);
  font-size: 24px;
  ${mobile({
    fontSize: '20px',
  })}
`;

const Price = styled.div`
  font-family: var(--font-primary);
  font-weight: 500;
  color: var(--color-secondary);
  span {
    font-size: 18px;
    ${mobile({
      fontSize: '14px',
    })}
  }
  ${mobile({
    fontSize: '14px',
  })}
`;

const Description = styled.p`
  padding: 10px 0;
  color: var(--color-secondary);
  font-family: var(--font-primary);
  font-size: 16px;
  ${mobile({
    fontSize: '14px',
  })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;

  color: var(--color-secondary);
  span {
    margin-left: 5px;
  }
`;
const SmDetail = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Bid = styled.div`
  width: 60%;
  background-color: white;
  padding: 20px 30px;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  ${mobile({
    width: '100%',
    padding: '10px',
  })}
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Subtitle = styled.div``;

const Form = styled.div`
  padding-top: 10px;
  display: flex;
  width: 90%;
  justify-content: space-between;
  ${mobile({
    width: '100%',
  })}
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-right: 20px;
  margin-bottom: 10px;
  label {
    margin-bottom: 5px;
    font-family: var(--font-primary);
    color: var(--color-secondary);
    ${mobile({
      fontSize: '14px',
    })}
  }
  input {
    width: 90%;
    outline: none;
    border: 1px solid #dfdfdf;
    border-radius: 7px;
    padding: 5px;
    color: var(--color-secondary);
  }
`;

const Label = styled.div`
  padding-bottom: 20px;
  font-size: 14px;
  font-family: var(--font-primary);
  color: var(--color-secondary);
  span {
    margin-left: 2px;
    font-weight: 500;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-bottom: 20px;
  label {
    margin-bottom: 5px;
    font-family: var(--font-primary);
    color: var(--color-secondary);
    ${mobile({
      fontSize: '14px',
    })}
  }
  textarea {
    width: 90%;
    outline: none;
    border: 1px solid #dfdfdf;
    border-radius: 7px;
    padding: 5px;
    color: var(--color-secondary);
  }
`;

const PlaceBid = styled.button`
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 7px;
  padding: 10px 20px;
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  ${mobile({
    fontSize: '14px',
  })}
`;

const JobDetail = () => {
  return (
    <Conatiner>
      <Detail>
        <Title>
          <Name>Test Job 1</Name>
          <Price>
            Rs <span>2000</span>
          </Price>
        </Title>
        <Description>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi saepe neque laborum sequi minus non adipisci impedit voluptatem quibusdam ipsa?</Description>
        <Bottom>
          <SmDetail>
            <MdReportProblem /> <span>Report Project</span>
          </SmDetail>
        </Bottom>
      </Detail>

      <Bid>
        <Title>
          <Name>Place your Bid on this Project</Name>
        </Title>
        <Center>
          {/* <Subtitle>You cannot edit your bid once </Subtitle> */}
          <Form>
            <Item>
              <label>Enter your bid amount</label>
              <input type='number' />
            </Item>
            <Item>
              <label>Enter your deadline</label>
              <input type='number' />
            </Item>
          </Form>
          <Label>
            You will get Rs.<span>110</span> - Rs.<span>05</span> = Rs.<span>105</span>
          </Label>
          <Text>
            <label>Describe your proposal</label>
            <textarea cols='30' rows='5' style={{ resize: 'none' }}></textarea>
          </Text>
        </Center>
        <Bottom>
          <PlaceBid>Submit</PlaceBid>
        </Bottom>
      </Bid>
    </Conatiner>
  );
};
export default JobDetail;
