import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import toast from "react-hot-toast";

function AllocateSubject({ onCourseAdded }) {
  const [courseId, setCourseId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchSubjects();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/course");
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/subject");
      setSubjects(response.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/allocation/allocate",
        { courseId: courseId, subjectId: subjectId },
        { withCredentials: true }
      );
      console.log("Teacher Allocated to subject successfully:", response.data);
      // Call the onCourseAdded callback passed from the parent component
      onCourseAdded();
      setCourseId("");
      setSubjectId("");
      toast.success(response.data.message);
    } catch (error) {
      // console.log(error);
      toast.error("Teacher Is not Available for This subject");
    }
  };

  return (
    <>
      <div className="addData">
        <form onSubmit={handleSubmit}>
          <h2>Allocate Subject To Teacher</h2>
          <div className="form-group fullname">
            <label htmlFor="course">Course Name</label>
            <select
              id="course"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group branch">
            <label htmlFor="branch">Subject Name</label>
            <select
              id="branch"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group submit-btn">
            <input type="submit" value="Allocate Subject" />
          </div>
        </form>
      </div>
    </>
  );
}

export default AllocateSubject;
