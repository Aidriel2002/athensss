import React, { useState } from "react";
import { registerAdmin } from "../../services/auth";

function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleRegister = async () => {
    try {
      await registerAdmin(email, password, name, contact, birthdate);
      alert("Admin registered successfully!");
      window.location.href = "/admin-login";
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div>
      <h3>Register Admin</h3>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="Contact" onChange={(e) => setContact(e.target.value)} />
      <input placeholder="Birthdate" type="date" onChange={(e) => setBirthdate(e.target.value)} />
      <button onClick={handleRegister}>Register Admin</button>
    </div>
  );
}

export default AdminRegister;
