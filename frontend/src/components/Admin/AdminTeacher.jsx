import { useState, useEffect } from "react";
import axios from "axios";
import AddTeacher from "./AddTeacher";
import TeacherDetials from "./TeacherDetials";
import "./Admin.css";

const AdminTeacher = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/teacher/allteacher"
      );
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching Teachers:", error);
    }
  };

  const handleCourseAdded = () => {
    fetchTeachers(); // Fetch teachers again after adding a new course
  };

  return (
    <>
      <section className="teacherdetials" style={{padding:"0px 20px 40px 20px"}}>
        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <h4
            style={{
              color: "black",
              fontWeight: "600",
              borderBottom: "3px solid #ff7700fa",
              borderRadius: "5px",
            }}
          >
            Teachers
          </h4>
        </div>
        <div style={{display:"flex",gap:"20px"}}>
          <AddTeacher onTeacherAdded={handleCourseAdded} />
          <TeacherDetials teachers={teachers} fetchTeachers={fetchTeachers} />
        </div>
      </section>
    </>
  );
};

export default AdminTeacher;
