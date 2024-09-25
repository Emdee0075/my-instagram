// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZh6TYTKQKElXVq2jbAOWlPDzminHG9ds",
  authDomain: "my-instagram-b7549.firebaseapp.com",
  projectId: "my-instagram-b7549",
  storageBucket: "my-instagram-b7549.appspot.com",
  messagingSenderId: "211057835155",
  appId: "1:211057835155:web:c7d771a12745eff3f7e166"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export { app, db, storage, auth };

