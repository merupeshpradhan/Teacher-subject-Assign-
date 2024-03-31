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
        <Addsubjects onCourseAdded={handleCourseAdded}/>
        <Subjectdetails subjects={subjects} fetchSubjects={fetchSubjects}/>
      </section>
    </>
  );
};

export default AdminSubjects;
