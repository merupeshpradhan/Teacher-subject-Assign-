import  { useState, useEffect } from "react";
import axios from "axios";
import Addsubjects from "./Addsubjects";
import Subjectdetails from "./Subjectdetails";

const AdminSubjects = () => {
  const [subjects,setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/subject");
      setSubjects(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCourseAdded = () => {
    fetchSubjects(); // Fetch courses again after adding a new course
  };

  return (
    <>
      <section className="allsubject">
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <h4
            style={{
              color: "black",
              fontWeight: "600",
              borderBottom: "3px solid #ff68de",
            }}
          >
            Subjects
          </h4>
        </div>
        <Addsubjects onCourseAdded={handleCourseAdded}/>
        <Subjectdetails subjects={subjects} fetchSubjects={fetchSubjects}/>
      </section>
    </>
  );
};

export default AdminSubjects;
