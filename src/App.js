import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GoogleLoginButton from "./components/Auth/GoogleLoginButton";
import EmailPasswordLogin from "./components/Auth/EmailPasswordLogin";
import AdminRegister from "./components/Auth/AdminRegister";
import AdminHome from "./pages/Admin/Home";
import AddExam from "./pages/Admin/AddExam";    // ✅ Import AddExam
import ExamResults from "./pages/Admin/ExamResults"; // ✅ Import ExamResults
import StudentHome from "./pages/Student/Home";
import ExamTaken from "./pages/Student/ExamTaken";
import RegisterAccount from "./pages/Admin/RegisterAccount";
import Profile from "./pages/Student/Profile";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Exams from "./pages/Student/Exams";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin-login" element={<EmailPasswordLogin />} />
            <Route path="/admin-register" element={<AdminRegister />} />

            <Route
              path="/admin/home"
              element={
                <ProtectedRoute>
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/register-account"
              element={
                <ProtectedRoute>
                  <RegisterAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-exam"   // ✅ Add Exam Route
              element={
                <ProtectedRoute>
                  <AddExam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/exam-results"   // ✅ Add Exam Results Route
              element={
                <ProtectedRoute>
                  <ExamResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/home"
              element={
                <ProtectedRoute>
                  <StudentHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/exam-taken"
              element={
                <ProtectedRoute>
                  <ExamTaken />
                  </ProtectedRoute>
              }
            />
         
   
        <Route path="/exam/:id"
        element={
          <ProtectedRoute>
            <Exams />
            </ProtectedRoute>
            } />
   
            <Route
              path="/student/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}

const LoginPage = () => (
  <div>
    <h2>Login</h2>
    <GoogleLoginButton />
    <h3>Admin Login</h3>
    <EmailPasswordLogin />
  </div>
);

export default App;
