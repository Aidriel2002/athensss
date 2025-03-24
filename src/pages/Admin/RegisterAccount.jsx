import React, { useState } from "react";
import { registerAdmin } from "../../services/auth";

function RegisterAccount() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerAdmin(email, password, name, contact, birthdate);
      alert("Admin registered successfully!");
      setName("");
      setContact("");
      setBirthdate("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Register New Admin</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <input
        placeholder="Birthdate"
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register Admin</button>
    </div>
  );
}

export default RegisterAccount;
