import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { update } from '../../store/apiCalls';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addNotification } from '../../store/notificationSlice';
import { v4 } from 'uuid';

const Container = styled.div`
  width: 30%;
  height: 45%;
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
  padding: 80px 30px;
  position: relative;
`;
const Title = styled.h1`
  color: var(--color-secondary);
  font-family: var(--font-title);
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  background-color: #f1f1f1;
  color: var(--color-secondary);
  font-family: var(--font-secondary);
  outline: none;
  border: none;
  border-radius: 5px;

  font-size: 16px;
`;

const Submit = styled.button`
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
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background-color: #7a77775c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  svg {
    font-size: 24px;
    color: #676666;
    font-weight: bold;
  }
`;

const Edit = ({ setActive, name, user }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [payload, setPayload] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const handleSubmit = async () => {
    const res = update(payload, dispatch, user._id).then(setActive(false));
    if (!res.status === 200) {
      dispatch(
        addNotification({
          id: v4(),
          type: 'Error',
          message: 'Something went wrong',
        })
      );
    } else {
      dispatch(
        addNotification({
          id: v4(),
          type: 'Success',
          message: 'Profile updated successfully',
        })
      );
    }
  };
  const handleChange = e => {
    setInput(e.target.value);
    setPayload({ ...payload, [name]: e.target.value });
  };
  const handleUpload = e => {
    e.preventDefault();
    upload([{ file: avatar, label: 'avatar' }]);
  };

  const upload = items => {
    items.forEach(i => {
      const fileName = new Date().getTime() + 'file' + i.label + i.file.name;
      const avatarRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(avatarRef, i.file);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        err => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            setPayload({ ...payload, [name]: url });
            setUploaded(true);
          });
        }
      );
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Edit your {name}</Title>
        {!(name === 'avatar') ? (
          <Input placeholder={`Change your ${name}`} value={input} name={name} onChange={handleChange} />
        ) : (
          <>
            <Input name={name} type='file' onChange={e => setAvatar(e.target.files[0])} />
          </>
        )}
        <Submit onClick={!(name === 'avatar' && !uploaded) ? handleSubmit : handleUpload}>{name === 'avatar' && !uploaded ? 'Upload the image' : 'Save Changes'}</Submit>
        <Close
          onClick={() => {
            setActive(false);
          }}
        >
          <IoMdClose />
        </Close>
      </Wrapper>
    </Container>
  );
};
export default Edit;
