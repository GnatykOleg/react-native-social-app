// import AsyncStorage from "@react-native-async-storage/async-storage";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import {
//   initializeAuth,
//   getReactNativePersistence,
// } from "firebase/auth/react-native";

import { getAuth } from "firebase/auth";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  // apiKey: "AIzaSyB5lPLolaG9p-Pb4sd-GHMFe6YksDCLLSU",
  // authDomain: "react-native-sa-9438d.firebaseapp.com",
  // projectId: "react-native-sa-9438d",
  // storageBucket: "react-native-sa-9438d.appspot.com",
  // messagingSenderId: "1092340315735",
  // appId: "1:1092340315735:web:efe04fabbcc0494ea09512",
};

const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
