// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyBx5NjTc9S9ovXRRbvbcfsrbYxnd_X0vkw",
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "learn-firebase-3725d.firebaseapp.com",
  projectId: "learn-firebase-3725d",
  storageBucket: "learn-firebase-3725d.appspot.com",
  messagingSenderId: "575679159951",
  appId: "1:575679159951:web:b5420d9742809080501afa",
  measurementId: "G-EWPX1ZKK6J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// init service
export const db = getFirestore(app);

export const auth = getAuth(app);
