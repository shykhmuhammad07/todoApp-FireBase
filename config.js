// config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwBuy-gkE9CDZpjA8zVRAteDV4PxCsVBk",
  authDomain: "muhammad-sheikh.firebaseapp.com",
  projectId: "muhammad-sheikh",
  storageBucket: "muhammad-sheikh.firebasestorage.app",
  messagingSenderId: "292369780037",
  appId: "1:292369780037:web:fa0b44444532a6cef5022c",
  measurementId: "G-Y4SJ536K1D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
