// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2tD8PtAv6wyyECVlmxik0wLnIMXXykik",
  authDomain: "eventomania-1337.firebaseapp.com",
  projectId: "eventomania-1337",
  storageBucket: "eventomania-1337.firebasestorage.app",
  messagingSenderId: "882052594498",
  appId: "1:882052594498:web:bea085d69e07c0666a66db",
  measurementId: "G-W9KP42F6NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
