import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOdR-CN60YAZZ8RAvvz3gG0L2yFpf1DZ0",
  authDomain: "timecoin-app.firebaseapp.com",
  projectId: "timecoin-app",
  storageBucket: "timecoin-app.appspot.com",
  messagingSenderId: "829653396755",
  appId: "1:829653396755:web:927e27891e51680c297ee6",
  measurementId: "G-CCTR2T0L6Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
