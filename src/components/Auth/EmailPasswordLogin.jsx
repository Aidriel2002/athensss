import React, { useState } from "react";
import { adminLogin, resetPassword } from "../../services/auth";

function EmailPasswordLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async () => {
    try {
      await adminLogin(email, password);
      window.location.href = "/admin/home";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!forgotEmail) {
      alert("Please enter your email to reset password.");
      return;
    }
    try {
      await resetPassword(forgotEmail);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h3>Admin Login</h3>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin}>Login</button>

      <h4>Forgot Password?</h4>
      <input
        placeholder="Enter your email"
        onChange={(e) => setForgotEmail(e.target.value)}
        value={forgotEmail}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
    </div>
  );
}

export default EmailPasswordLogin;
