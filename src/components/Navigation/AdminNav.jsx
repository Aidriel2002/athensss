import React from "react";
import { logout } from "../../services/auth";
import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <nav>
      <ul>
        <li><Link to="/admin/home">Home</Link></li>
        <li><Link to="/admin/register-account">Register Account</Link></li>
        <li><Link to="/admin/add-exam">Add Exam</Link></li>
        <li><Link to="/admin/exam-results">Exam Results</Link></li>
        <li><Link to="/admin/profile">Profile</Link></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default AdminNav;
