import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import "./AdminCourse.css";

function CourseDetials() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/course");
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:4000/api/v1/course/delete/${id}`,{ withCredentials: true });
      // After successful deletion, fetch courses again to update the list
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  return (
    <>
      <div className="course-detials-container">
        <div className="detials-header">
          <h3>Courses</h3>
        </div>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Course Name</th>
                <th>Brnch Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.branch}</td>
                  <td>
                    <MdDeleteForever
                      style={{
                        color: "red",
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                      onClick={() => handleDelete(course._id)}
                    />
                    <FiEdit
                      style={{
                        color: "green",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(course._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CourseDetials;
