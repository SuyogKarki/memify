import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../config';
import { addNotification } from '../../store/notificationSlice';
import { v4 } from 'uuid';
import { mobile, tablet } from '../../responsive';
import { keyframes } from 'styled-components';

const Rotate = keyframes`
from {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }
    to { 
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
`;

const Container = styled.div`
  width: 90%;
  min-height: 100px;
  background-color: #fff;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  padding: 15px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    width: '90%',
    minHeight: '50px',
    padding: '15px 20px',
  })}
`;

const Title = styled.h1`
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 10px;
  ${mobile({
    fontSize: '16px',
  })}

  ${tablet({
    fontSize: '18px',
  })}
`;
const Buttons = styled.div`
  /* display: ${props => props.display}; */
  display: flex;
  ${mobile({
    marginTop: '20px',
  })}
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: var(--color-primary);
  color: #fff;
  padding: 7px 30px;
  cursor: pointer;
  border-radius: 7px;
  &:first-child {
    margin-right: 20px;
  }
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  ${mobile({
    fontSize: '12px',
    padding: '7px 10px',
  })}
`;

const Center = styled.div`
  display: ${props => props.display};
  flex-direction: column;
  flex: 1;
  margin: 20px 0;
`;

const FileItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  label {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151, 150, 150);
    font-family: var(--font-primary);
  }
  input {
    padding: 5px 10px;
    border: 1px solid #dfdfdf;
    border-radius: 7px;

    width: 90%;
    outline: none;
    border: 1px solid #dfdfdf;

    color: var(--color-secondary);
  }
  ${mobile({
    width: '100%',
    label: {
      fontSize: '12px',
    },
    input: {
      fontSize: '12px',
    },
  })}
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  margin: 1px auto 0;
  border: solid 1px white;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  -webkit-transition: all 0.5s ease-in;
  -webkit-animation-name: ${Rotate};
  -webkit-animation-duration: 1s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;

  transition: all 0.5s ease-in;
  animation-name: ${Rotate};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
const Upload = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [uploading, setUploading] = useState(false);
  const [props, setProps] = useState({
    type: '',
    display: 'none',
  });

  const [uploaded, setUploaded] = useState(0);
  const [post, setPost] = useState({
    title: '',
    userId: user?._id,
    type: '',
    file: '',
  });

  const [img, setImg] = useState(null);

  const upload = items => {
    items.forEach(i => {
      setUploading(true);
      const fileName = new Date().getTime() + 'file' + i.label + i.file.name;
      const postRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(postRef, i.file);
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
            setPost(prev => {
              return { ...prev, [i.label]: url };
            });

            setUploaded(prev => prev + 1);

            setUploading(false);
          });
        }
      );
    });
  };

  const buttonClick = type => {
    setProps(prev => ({
      ...prev,
      display: 'flex',
      type: type,
    }));
    setPost(prev => ({ ...prev, type: type }));
  };

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleUpload = e => {
    e.preventDefault();
    upload([{ file: img, label: 'file' }]);
  };

  const handleSubmit = () => {
    axiosInstance.post('/posts', post);
    setUploaded(0);
    dispatch(
      addNotification({
        id: v4(),
        type: 'Success',
        message: 'Successfully created the post',
      })
    );
  };

  return (
    <Container>
      <Title>Make someone laugh with your meme or soundtrack.</Title>
      <Center display={props.display}>
        <FileItem>
          <label>Enter your title</label>
          <input type='text' placeholder={'Enter your title'} name='title' value={post.title} onChange={handleChange} />
        </FileItem>
        <FileItem>
          <label>Choose a {props.type}</label>
          {props.type === 'meme' ? (
            <input type='file' name='img' onChange={e => setImg(e.target.files[0])} accept='image/png, image/gif, image/jpeg' />
          ) : (
            <input type='file' name='audio' onChange={e => setImg(e.target.files[0])} accept='audio/mp3' />
          )}
        </FileItem>
      </Center>
      <Buttons>
        {props.display === 'none' ? (
          <>
            <Button onClick={() => buttonClick('meme')}>Share a meme</Button>
            <Button onClick={() => buttonClick('soundtrack')}>Share a soundtrack</Button>
          </>
        ) : (
          <>
            {props.type === 'meme' ? (
              <>
                {uploaded === 1 ? <Button onClick={handleSubmit}>Post the meme</Button> : <Button onClick={handleUpload}>{uploading ? <Circle></Circle> : `Upload the file`}</Button>}
                <Button onClick={() => buttonClick('sound track')}>Share a soundtrack</Button>
              </>
            ) : (
              <>
                {uploaded === 1 ? <Button onClick={handleSubmit}> Post the soundtrack</Button> : <Button onClick={handleUpload}>{uploading ? <Circle></Circle> : `Upload the file`}</Button>}
                <Button onClick={() => buttonClick('meme')}>Share a meme</Button>
              </>
            )}
          </>
        )}
      </Buttons>
    </Container>
  );
};
export default Upload;
