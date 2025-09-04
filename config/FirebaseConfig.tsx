// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "react-auth-app-1b190.firebaseapp.com",
  projectId: "react-auth-app-1b190",
  storageBucket: "react-auth-app-1b190.appspot.com",
  messagingSenderId: "1070615650681",
  appId: "1:1070615650681:web:a7acea2d0ef5cddc2d8fa8",
  measurementId: "G-DDCZ9WVNW3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
