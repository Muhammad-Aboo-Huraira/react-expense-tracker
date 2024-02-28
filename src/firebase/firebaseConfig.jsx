import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "AIzaSyAtxM1ypvAHtrsb_SCJelplU-NLHdphBbM",
  authDomain: "react-expense-tracker-b5232.firebaseapp.com",
  projectId: "react-expense-tracker-b5232",
  storageBucket: "react-expense-tracker-b5232.appspot.com",
  messagingSenderId: "1055388220601",
  appId: "1:1055388220601:web:b16eb0061b271681d06f68",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  query,
  getDocs,
  where,
  deleteDoc,
  serverTimestamp
};
