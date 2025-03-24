import React from "react";
import { googleLogin } from "../../services/auth";

function GoogleLoginButton() {
  const handleLogin = async () => {
    try {
      await googleLogin();
      window.location.href = "/student/home";
    } catch (error) {
      alert("Login failed!");
    }
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}

export default GoogleLoginButton;
