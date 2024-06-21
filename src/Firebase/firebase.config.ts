// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQAHECjc68xwKy-R_d-3hflZs4G1ZBhVQ",
  authDomain: "movie-hive-8e45e.firebaseapp.com",
  projectId: "movie-hive-8e45e",
  storageBucket: "movie-hive-8e45e.appspot.com",
  messagingSenderId: "586927689067",
  appId: "1:586927689067:web:606ac7465a60ead13cd02e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
