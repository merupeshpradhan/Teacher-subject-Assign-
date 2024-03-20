import React, { useState, useEffect } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { IoBookSharp } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";

function DashboardCard() {
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
          "http://localhost:4000/api/v1/teacher"
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

  return (
    <>
      <div className="card-container">
        <div className="cards">
          <div className="card">
            <div className="header">
              <h4>Total Teacher</h4>
            </div>
            <div className="middle">
              <div className="icon">
                <PiUserCircleThin style={{ fontSize: "40px" }} />
              </div>
              <div className="detials">
                <p
                  style={{
                    textAlign: "end",
                    marginBottom: "5px",
                    fontSize: "20px",
                  }}
                >
                  {teacherCount}
                </p>
                <p style={{ fontSize: "10px" }}>
                  <Link to={"/admin/teachers"} onClick={() => setShow(false)}>
                    View Detial
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div className="header">
              <h4>Total Course</h4>
            </div>
            <div className="middle">
              <div className="icon">
                <IoDocumentOutline style={{ fontSize: "35px" }} />
              </div>
              <div className="detials">
                <p
                  style={{
                    textAlign: "end",
                    marginBottom: "5px",
                    fontSize: "20px",
                  }}
                >
                  {courseCount}
                </p>
                <p style={{ fontSize: "10px" }}>
                  <Link to={"/admin/courses"} onClick={() => setShow(false)}>
                    View Detial
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div className="header">
              <h4>Total Subjects</h4>
            </div>
            <div className="middle">
              <div className="icon">
                <IoBookSharp style={{ fontSize: "30px" }} />
              </div>
              <div className="detials">
                <p
                  style={{
                    textAlign: "end",
                    marginBottom: "5px",
                    fontSize: "20px",
                  }}
                >
                  {subjectCount}
                </p>
                <p style={{ fontSize: "10px" }}>
                  <Link to={"/admin/subjects"} onClick={() => setShow(false)}>
                    View Detial
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardCard;
