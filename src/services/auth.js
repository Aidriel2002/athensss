import { 
    auth, 
    googleProvider, 
    signInWithPopup, 
    signOut, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    createUserWithEmailAndPassword 
  } from "./firebase";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { db } from "./firebase";
  
  // Google Login for Students
  export const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          role: "STUDENT",
        });
      }
  
      return user;
    } catch (error) {
      console.error("Error during Google login:", error);
      throw error;
    }
  };
  export const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      alert("Error sending password reset email: " + error.message);
    }
  };
  
  // Admin Login with Email/Password
  export const adminLogin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists() && userSnap.data().role === "ADMIN") {
        return user;
      } else {
        throw new Error("Not authorized as admin");
      }
    } catch (error) {
      console.error("Error during Admin login:", error);
      throw error;
    }
  };
  
  // Admin Registration with Email/Password
  export const registerAdmin = async (email, password, name, contact, birthdate) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
  
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        contact,
        birthdate,
        role: "ADMIN",
      });
  
      return user;
    } catch (error) {
      console.error("Error during Admin registration:", error);
      throw error;
    }
  };
  
  // Logout
  export const logout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  