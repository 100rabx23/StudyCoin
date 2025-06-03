
  // src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "ENTER_YOUR",
    authDomain: "timecoin-app.firebaseapp.com",
    projectId: "timecoin-app",
    storageBucket: "timecoin-app.firebasestorage.app",
    messagingSenderId: "829653396755",
    appId: "1:829653396755:web:927e27891e51680c297ee6",
    measurementId: "G-CCTR2T0L6Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

