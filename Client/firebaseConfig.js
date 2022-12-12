import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: "AIzaSyAVoLk5BjrlZP2NQKeihKeiGA42O6rsWjM",
  authDomain: "tccifrs-e6183.firebaseapp.com",
  projectId: "tccifrs-e6183",
  storageBucket: "tccifrs-e6183.appspot.com",
  messagingSenderId: "899943363073",
  appId: "1:899943363073:web:8999630fc61ae5ed168600",
  measurementId: "G-GLW97SZWW6"
};

  const app = initializeApp(firebaseConfig);
  const auth2 = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  export const storage = getStorage(app);
  export const auth = getAuth(app);
  export const db = getFirestore(app);