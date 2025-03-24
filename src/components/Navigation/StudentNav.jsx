import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, signOut } from "../../services/firebase";
import { useProfile } from "../../context/ProfileContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase"; 
import "./StudentNav.css";

function StudentNav() {
  const { profile, setProfile } = useProfile();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (profile?.uid) {
      const unsubscribe = onSnapshot(doc(db, "users", profile.uid), (doc) => {
        if (doc.exists()) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            ...doc.data(),
          }));
        }
      });
  
      return () => unsubscribe();
    }
  }, [profile?.uid, setProfile]);
  


  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Failed to log out.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {!isSidebarOpen && (
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
      )}
      <div className={`side-nav ${isSidebarOpen ? "active" : ""}`}>
        {isSidebarOpen && (
          <button className="close-btn" onClick={toggleSidebar}>
            ✖
          </button>
        )}
        <div className="profile-section">
          {profile.photoURL && (
            <img src={profile.photoURL} alt="Profile" className="profile-pic" />
          )}
          <span className="profile-name">{profile.firstName}</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/student/home"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={toggleSidebar}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/exam-taken"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={toggleSidebar}
            >
              Exam Taken
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/profile"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={toggleSidebar}
            >
              Profile
            </NavLink>
          </li>
        </ul>
        <div className="logout-container">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default StudentNav;
