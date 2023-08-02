// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "project-name.firebaseapp.com",
  projectId: "project-name",
  storageBucket: "project-name.appspot.com",
  messagingSenderId: "123`4567890",
  appId: "1:1234567890:web:e3e553f9de4d6095da1d53",
  measurementId: "G-1UDSU1D1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);