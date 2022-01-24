// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPaIgivyLTLv6nCbTsi35W5xWb2sJMjn0",
  authDomain: "valentina-834fa.firebaseapp.com",
  projectId: "valentina-834fa",
  storageBucket: "valentina-834fa.appspot.com",
  messagingSenderId: "311128380415",
  appId: "1:311128380415:web:4e71403b5cd98ba9618dca",
  measurementId: "G-X4WG7PF6HS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db}