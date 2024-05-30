// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5Z8u73KyM9fR3MJGHoxkixtv-pZaNTkM",
  authDomain: "badminton-booking-9eb5c.firebaseapp.com",
  projectId: "badminton-booking-9eb5c",
  storageBucket: "badminton-booking-9eb5c.appspot.com",
  messagingSenderId: "934138839571",
  appId: "1:934138839571:web:f758624200743ea2b075e6",
  measurementId: "G-G5FVZWJTXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export {app, analytics, auth};
