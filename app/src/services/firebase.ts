// app/src/services/firebase.ts

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAByZokwcrVY1f6iCerCmdngOruHHJLKoQ",
  authDomain: "medora-46316.firebaseapp.com",
  projectId: "medora-46316",
  storageBucket: "medora-46316.firebasestorage.app",
  messagingSenderId: "493300800000",
  appId: "1:493300800000:web:496a3a879def3af75c56e5",
  measurementId: "G-3EDXZ8DPXP"
};

// Avoid double-init in Expo dev
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
