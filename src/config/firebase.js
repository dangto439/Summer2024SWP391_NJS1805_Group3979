// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2G7bT9R0SLTK6G0b2nlWMDAs7oZMqqds",
  authDomain: "badminton-booking-platform.firebaseapp.com",
  projectId: "badminton-booking-platform",
  storageBucket: "badminton-booking-platform.appspot.com",
  messagingSenderId: "184167471321",
  appId: "1:184167471321:web:e22ddb09ab104790b906c8",
  measurementId: "G-C8S4KQTRFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage();

export {app, analytics, auth, storage};
