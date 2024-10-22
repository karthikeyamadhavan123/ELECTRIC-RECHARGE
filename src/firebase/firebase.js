// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIYylwXLayQ6tbvkv5L6yzWihznTZwfIE",
  authDomain: "electric-123.firebaseapp.com",
  projectId: "electric-123",
  storageBucket: "electric-123.appspot.com",
  messagingSenderId: "469531478107",
  appId: "1:469531478107:web:0f1bb8f22199fc89fad77e",
  measurementId: "G-FRJV9CS1XM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication and Firestore database
export const auth = getAuth(app);
export const db = getFirestore(app);
