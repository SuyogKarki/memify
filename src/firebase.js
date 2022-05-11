import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA1kbQSUrwUwCRIQwPlK5xYmLBg7jko-s0',
  authDomain: 'memify-8155c.firebaseapp.com',
  projectId: 'memify-8155c',
  storageBucket: 'memify-8155c.appspot.com',
  messagingSenderId: '503000561054',
  appId: '1:503000561054:web:44a0c014a0549024bad28f',
  measurementId: 'G-YFGRCR0MDX',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
