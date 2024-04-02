import React, { useState } from "react";
import "./Admin.css";
import toast from "react-hot-toast";
import axios from "axios";

function AddCourse({ onCourseAdded }) {
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/course/addcourse",
        { name: course, branch: branch },
        { withCredentials: true }
      );
      console.log("Course added successfully:", response.data);
      // Call the onCourseAdded callback passed from the parent component
      onCourseAdded();
      setCourse("");
      setBranch("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="addData">
        <form onSubmit={handleSubmit}>
          <h2>Add a new course</h2>
          <div className="form-group fullname">
            <label htmlFor="course">Course Name</label>
            <input
              type="text"
              id="course"
              placeholder="Course Name"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div className="form-group branch">
            <label htmlFor="branch">Branch Name</label>
            <input
              type="text"
              id="branch"
              placeholder="Branch Name"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <div className="form-group submit-btn">
            <input type="submit" value="Add Course" />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
