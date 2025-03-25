// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyDCtt57BAsbA2CpSHkc6rUkaxFOy3ONj2E",
  authDomain: "mohammad-market.firebaseapp.com",
  projectId: "mohammad-market",
  storageBucket: "mohammad-market.firebasestorage.app",
  messagingSenderId: "951432195651",
  appId: "1:951432195651:web:7f609695fbbe111c66eef6",
  measurementId: "G-Z96F36EG71"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تهيئة قاعدة البيانات
const db = getFirestore(app);

export { db };
