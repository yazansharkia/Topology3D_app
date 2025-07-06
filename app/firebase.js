// Import the necessary Firebase libraries
import { initializeApp,getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';  // ✅ Import Firestore

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzqQq5jsOSxbtW6p2c3maoRj8yjyb94s8",
//  authDomain: "berlin-d9835.firebaseapp.com",
//  databaseURL: 'https://project-id.firebaseio.com',
  projectId: "berlin-d9835",
//  storageBucket: "berlin-d9835.firebasestorage.app",
  storageBucket: "berlin-d9835-1k2zd",
//  messagingSenderId: "379749496592",
  appId: "1:379749496592:ios:ba1c5625a5e171bf125795",
//  measurementId: 'G-measurement-id',

};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);
//const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export { storage , auth , db};
