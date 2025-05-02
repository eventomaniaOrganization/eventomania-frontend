import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2tD8PtAv6wyyECVlmxik0wLnIMXXykik",
  authDomain: "eventomania-1337.firebaseapp.com",
  projectId: "eventomania-1337",
  storageBucket: "eventomania-1337.firebasestorage.app",
  messagingSenderId: "882052594498",
  appId: "1:882052594498:web:bea085d69e07c0666a66db",
  measurementId: "G-W9KP42F6NL"
};

// Init
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 