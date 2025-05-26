// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyATxE7Gus4LU_wS44mP-AUm86_1g05DHTc',
  authDomain: 'dream-decoder-1fcb8.firebaseapp.com',
  databaseURL: 'https://dream-decoder-1fcb8.firebaseio.com',
  projectId: 'dream-decoder-1fcb8',
  storageBucket: 'dream-decoder-1fcb8.appspot.com',
  messagingSenderId: '366168998435',
  appId: '1:366168998435:web:8a488c25964178bb2ee796',
  measurementId: 'G-GEDRGMSCQJ'
};

const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === 'web') {
  // Use browserLocalPersistence for web
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  // Use AsyncStorage for React Native
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };