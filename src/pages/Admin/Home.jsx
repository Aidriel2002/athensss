import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/Navigation/AdminNav";

function AdminHome() {
  const navigate = useNavigate();

  const handleAddExam = () => {
    navigate("/admin/add-exam");
  };

  return (
    <div>
      <AdminNav />
      <h1>Admin Home</h1>
      <button onClick={handleAddExam}>Add Exam</button>
    </div>
  );
}

export default AdminHome;
