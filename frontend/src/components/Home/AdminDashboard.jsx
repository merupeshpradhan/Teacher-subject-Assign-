import React, { useState, useEffect } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { IoBookSharp } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Card from "./Card";
import "./DashboardCard.css";

function Dashboard() {
  const [subjectCount, setSubjectCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

  useEffect(() => {
    // Fetch total subject count from API
    const fetchSubjectCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/subject"
        );
        setSubjectCount(response.data.count);
      } catch (error) {
        console.error("Error fetching subject count:", error);
      }
    };

    // Fetch total course count from API
    const fetchCourseCount = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/course");
        setCourseCount(response.data.count);
      } catch (error) {
        console.error("Error fetching course count:", error);
      }
    };

    // Fetch total teacher count from API
    const fetchTeacherCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/teacher/allteacher"
        );
        setTeacherCount(response.data.count);
      } catch (error) {
        console.error("Error fetching teacher count:", error);
      }
    };

    // Call all fetch functions
    fetchSubjectCount();
    fetchCourseCount();
    fetchTeacherCount();
  }, []); // Empty dependency array ensures useEffect only runs once
  console.log(teacherCount);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <h4
          style={{
            color: "black",
            fontWeight: "600",
            borderBottom: "3px solid #ff68de",
            borderRadius:"5px"
          }}
        >
          Admin Dashboard
        </h4>
      </div>
      <div className="card-container">
        <Card
          title="Add New Teachers"
          subtitle="Now Teachers"
          IconComponent={PiUserCircleThin}
          teacherCount={teacherCount}
          path="/admin/teachers"
          bgcolor="#65b784"
        />
        <Card
          title="Courses"
          subtitle="Avilable Courses"
          IconComponent={IoDocumentOutline}
          teacherCount={courseCount}
          path="/admin/courses"
          bgcolor="#aa4b6b"
        />
        <Card
          title="Subjects"
          subtitle="Avilable Subjects"
          IconComponent={IoBookSharp}
          teacherCount={subjectCount}
          path="/admin/subjects"
          bgcolor="#c9a95f"
        />
        <Card
          title="Subject Allocation"
          subtitle="Assign Teacher"
          IconComponent={IoBookSharp}
          path="/admin/allocation"
          bgcolor="#885fd5"
        />
        <Card
          title="Admin Profile"
          subtitle="Admin Detials"
          IconComponent={IoBookSharp}
          path="/admin/profile"
          bgcolor="#fc5c7d"
        />
        <Card
          title="Teachers"
          subtitle="Teacher All Detials"
          IconComponent={IoBookSharp}
          path="/admin/teachers"
          bgcolor="#3a8f7f"
        />
      </div>
    </>
  );
}

export default Dashboard;
