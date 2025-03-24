import React, { useState, useEffect, useCallback } from "react";
import { db, auth } from "../../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import StudentNav from "../../components/Navigation/StudentNav";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contact: "",
    birthdate: "",
    photoURL: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [message, setMessage] = useState("");


  const showMessage = (text, isError = false) => {
    setMessage(text);
    const messageElement = document.querySelector(".message");
    if (messageElement) {
      messageElement.classList.toggle("error", isError);
    }
    setTimeout(() => setMessage(""), 4000); 
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const fetchProfile = useCallback(async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.birthdate) {
          const date = new Date(data.birthdate);
          data.birthdate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
        setProfile(data);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      showMessage("Error fetching profile.", true);
    }
  }, []);


  const handleUpdate = async () => {
    try {
      let photoURL = profile.photoURL;

    
      if (photoFile) {
        try {
          photoURL = await convertToBase64(photoFile);
        } catch (error) {
          console.error("Error converting photo to Base64:", error.message);
          showMessage("Failed to convert photo.", true);
          return;
        }
      }

      const userRef = doc(db, "users", auth.currentUser.uid);


      const updatedProfile = {};
      if (profile.firstName) updatedProfile.firstName = profile.firstName;
      if (profile.middleName) updatedProfile.middleName = profile.middleName;
      if (profile.lastName) updatedProfile.lastName = profile.lastName;
      if (profile.contact) updatedProfile.contact = profile.contact;
      if (profile.birthdate) updatedProfile.birthdate = profile.birthdate;
      if (photoURL) updatedProfile.photoURL = photoURL;

      await updateDoc(userRef, updatedProfile);

      showMessage("Profile updated successfully!");
      setEditMode(false);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error.message);
      showMessage("Failed to update profile. Please check console for details.", true);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div>
      <StudentNav />
      <div className="ProfileContent">
        <h2>Student Profile</h2>
        {!editMode ? (
          <>
            {profile.photoURL && (
              <img
                src={profile.photoURL}
                alt="Profile"
                width="120"
                height="120"
              />
            )}
            <table>
              <tbody>
                <tr>
                  <th>First Name:</th>
                  <td>{profile.firstName}</td>
                </tr>
                <tr>
                  <th>Middle Name:</th>
                  <td>{profile.middleName}</td>
                </tr>
                <tr>
                  <th>Last Name:</th>
                  <td>{profile.lastName}</td>
                </tr>
                <tr>
                  <th>Contact:</th>
                  <td>{profile.contact}</td>
                </tr>
                <tr>
                  <th>Birthdate:</th>
                  <td>{profile.birthdate}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={() => setEditMode(true)}>Manage Profile</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Middle Name"
              value={profile.middleName}
              onChange={(e) =>
                setProfile({ ...profile, middleName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Contact"
              value={profile.contact}
              onChange={(e) =>
                setProfile({ ...profile, contact: e.target.value })
              }
            />
            <input
              type="date"
              placeholder="Birthdate"
              value={profile.birthdate}
              onChange={(e) =>
                setProfile({ ...profile, birthdate: e.target.value })
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
            />
            <button onClick={handleUpdate}>Save Changes</button>
            <button
              className="cancel-btn"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      {message && (
          <p className={`message ${message.includes("Failed") ? "error" : ""}`}>
            {message}
          </p>
        )}
    </div>
  );
}

export default Profile;
