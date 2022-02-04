
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { getDatabase, ref, set, push, onValue,child,onChildAdded } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCAcGEJ19UlZ2j-ogHPP5-ZmQL1lnGbMnI",
  authDomain: "chatt1-f443b.firebaseapp.com",
  projectId: "chatt1-f443b",
  storageBucket: "chatt1-f443b.appspot.com",
  messagingSenderId: "253938571015",
  appId: "1:253938571015:web:1ae7c310298ae0747857a2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {getAuth, createUserWithEmailAndPassword,updateProfile,getDatabase, ref, set,signInWithEmailAndPassword,signOut,push,onValue,child,onChildAdded,storage }