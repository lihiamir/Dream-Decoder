// config/firebase.js
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyATxE7Gus4LU_wS44mP-AUm86_1g05DHTc',
  authDomain: 'dream-decoder-1fcb8.firebaseapp.com',
  projectId: 'dream-decoder-1fcb8',
  storageBucket: 'dream-decoder-1fcb8.firebasestorage.app',
  messagingSenderId: '366168998435',
  appId: '1:366168998435:web:8a488c25964178bb2ee796',
  measurementId: 'G-GEDRGMSCQJ'
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
