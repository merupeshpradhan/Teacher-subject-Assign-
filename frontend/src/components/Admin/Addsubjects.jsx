import React, { useState } from "react";
import "./course.css";
import toast from "react-hot-toast";
import axios from "axios";



function Addsubjects({ onCourseAdded }) {
  const [subjectName, setSubjectName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [subjectShortName, setSubjectShortName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/subject",
        { name: subjectName, courseName: courseName, subjectShortName: subjectShortName, subjectCode: subjectCode },
        { withCredentials: true }
      );
      console.log("Subject added successfully:", response.data);
      // Call the onCourseAdded callback passed from the parent component
      onCourseAdded();
      setSubjectName("");
      setCourseName("");
      setSubjectShortName("");
      setSubjectCode("");

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="addcourse">
        <form onSubmit={handleSubmit}>
          <h2>Add a new Subject</h2>
          <div className="form-group fullname">
            <label htmlFor="course">Subject Name</label>
            <input
              type="text"
              id="Subject"
              placeholder="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>
          <div className="form-group branch">
            <label htmlFor="branch">Course Name</label>
            <input
              type="text"
              id="Course"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className="form-group branch">
            <label htmlFor="branch">Subject Short Name</label>
            <input
              type="text"
              id="SubjectShort"
              placeholder="Subject Short Name"
              value={subjectShortName}
              onChange={(e) => setSubjectShortName(e.target.value)}
            />
          </div>
          <div className="form-group branch">
          <label htmlFor="branch">Subject Code </label>
          <input
            type="text"
            id="SubjectCode"
            placeholder="Subject Code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          />   
        </div>
          <div className="form-group submit-btn">
            <input type="submit" value="Add Course" />
          </div>
        </form>
      </div>
    </>
  )
}

export default Addsubjects