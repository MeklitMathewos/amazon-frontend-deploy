// import firebase from "firebase/compat/app";
// import { getAuth } from "firebase/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// // Initialize Firebase services
//  const auth = getAuth(app);
//  const db = app.firestore();
// export { auth, db };



import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import  "firebase/compat/firestore"
import"firebase/compat/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARUgwbtYqAO62p99jE-9LKD94XKyYfXqw",
  authDomain: "clone-f1cfc.firebaseapp.com",
  projectId: "clone-f1cfc",
  storageBucket: "clone-f1cfc.appspot.com",
  messagingSenderId: "456154765140",
  appId: "1:456154765140:web:fa75e17d2f684fe7bf5ac1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = app.firestore();