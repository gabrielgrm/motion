// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4R3YAIhmInuNkP6XpxLu0sB_MoCyCI2s",
  authDomain: "motion-b4a28.firebaseapp.com",
  projectId: "motion-b4a28",
  storageBucket: "motion-b4a28.firebasestorage.app",
  messagingSenderId: "543652437682",
  appId: "1:543652437682:web:600178ed991f84e78ff3ab"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};