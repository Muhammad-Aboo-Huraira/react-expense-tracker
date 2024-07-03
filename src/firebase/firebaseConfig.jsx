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
  apiKey: "AIzaSyAorqUbsUvyVVpzMuosKwChpHrpfRKvgYE",
  authDomain: "react-expense-tracker-f2014.firebaseapp.com",
  projectId: "react-expense-tracker-f2014",
  storageBucket: "react-expense-tracker-f2014.appspot.com",
  messagingSenderId: "1072717731780",
  appId: "1:1072717731780:web:c48de99b51739ade7b3691"
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
