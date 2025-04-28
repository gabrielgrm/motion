// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGU6GUgHZSfrSKiEmL3Md3vcJi4PBkFeI",
  authDomain: "motion-88beb.firebaseapp.com",
  projectId: "motion-88beb",
  storageBucket: "motion-88beb.firebasestorage.app",
  messagingSenderId: "242552814757",
  appId: "1:242552814757:web:5402f63e2dee344ee7614c"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};