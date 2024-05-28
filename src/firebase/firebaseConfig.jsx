import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  query,
  updateDoc,
  where,
  getDoc,
  orderBy,
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
  apiKey: "AIzaSyBReWmPFOS8dTIHvT6-C77Yf4kKMQ5oVWc",
  authDomain: "react-expense-tracker-4f960.firebaseapp.com",
  projectId: "react-expense-tracker-4f960",
  storageBucket: "react-expense-tracker-4f960.appspot.com",
  messagingSenderId: "211265716138",
  appId: "1:211265716138:web:b3dde8d376e521afcc35d3"
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
  getDoc,
  updateDoc,
  orderBy,
  doc,
  getDocs,
  where,
  deleteDoc,
  serverTimestamp
};
