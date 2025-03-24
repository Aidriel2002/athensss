import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // 🔥 Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyDri93DHUUYzJgj0N3lKWimCI5w_LR1Rm4",
  authDomain: "athens-db.firebaseapp.com",
  projectId: "athens-db",
  storageBucket: "athens-db.appspot.com",   // 🔥 Fixed storage bucket URL
  messagingSenderId: "823309041696",
  appId: "1:823309041696:web:b112bbae9a4f8949613c45"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);    // 🔥 Export Storage instance
export {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
};
