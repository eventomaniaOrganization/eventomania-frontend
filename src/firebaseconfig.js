// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnwBz8Z1fXmXmu4ywFM4Zg74xk1Ui26E0",
  authDomain: "authentication-c9540.firebaseapp.com",
  projectId: "authentication-c9540",
  storageBucket: "authentication-c9540.appspot.app",
  messagingSenderId: "365021913473",
  appId: "1:365021913473:web:6035da89fd5d4765a4c880",
  measurementId: "G-P9ZL7GK1LZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)