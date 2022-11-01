import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: "AIzaSyBsG7i3hAlpbi-4jNLl4_rVltAGrvImPW4",
    authDomain: "turisinfo-596cb.firebaseapp.com",
    databaseURL: "https://turisinfo-596cb-default-rtdb.firebaseio.com",
    projectId: "turisinfo-596cb",
    storageBucket: "turisinfo-596cb.appspot.com",
    messagingSenderId: "598787220854",
    appId: "1:598787220854:web:79270ddaeb59563b388657"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  export const db = getFirestore(app);