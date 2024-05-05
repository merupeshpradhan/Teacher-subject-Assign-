import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminSubjects from "./components/Admin/AdminSubjects";
import AdminCourses from "./components/Admin/AdminCourses";
import AdminTeacher from "./components/Admin/AdminTeacher";
import AdminSubjectAllocation from "./components/Admin/AdminSubjectAllocation";
import TeacherClasses from "./components/Teacher/TeacherClasses";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import TeacherData from "./components/Teacher/TeacherData";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Admin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/subjects" element={<AdminSubjects />} />
          <Route path="/admin/teachers" element={<AdminTeacher />} />
          <Route
            path="/admin/allocation"
            element={<AdminSubjectAllocation />}
          />
          <Route path="/teacher/dashboard" element={<TeacherData/>} />
          <Route path="/teacher/classes" element={<TeacherClasses />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
};

export default App;
