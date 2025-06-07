// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDV49j8KH6ec675HOUKoJs3N38vYML_go",
  authDomain: "gitvault-a2130.firebaseapp.com",
  projectId: "gitvault-a2130",
  storageBucket: "gitvault-a2130.firebasestorage.app",
  messagingSenderId: "470722228480",
  appId: "1:470722228480:web:0147c81ced313393d883e5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
