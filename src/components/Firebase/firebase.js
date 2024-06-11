// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU7bDUS0SHtgviJ_nl503LKx07Ie3R6LU",
  authDomain: "mtgclicker.firebaseapp.com",
  projectId: "mtgclicker",
  storageBucket: "mtgclicker.appspot.com",
  messagingSenderId: "393711769847",
  appId: "1:393711769847:web:a72a94e308c1017f4b5bf2",
  measurementId: "G-YW506RL4GC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc, updateDoc };