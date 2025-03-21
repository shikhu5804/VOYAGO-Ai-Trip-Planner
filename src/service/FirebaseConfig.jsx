// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD2Pcyoy8FX4np_HW2iTHIaf_hnTnEAb0",
  authDomain: "ai-trip-planner-4a49a.firebaseapp.com",
  projectId: "ai-trip-planner-4a49a",
  storageBucket: "ai-trip-planner-4a49a.firebasestorage.app",
  messagingSenderId: "394909021173",
  appId: "1:394909021173:web:ff4d6685791080107366bc",
  measurementId: "G-FMB995Y3KQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);