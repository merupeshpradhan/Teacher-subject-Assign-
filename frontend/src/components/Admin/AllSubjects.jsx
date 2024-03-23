import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import "./AdminCourse.css";

function AllSubjects() {
  const [Subjects, setSubjects] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:4000/api/v1/course/delete/${id}`, {
        withCredentials: true,
      });
      // After successful deletion, fetch courses again to update the list
      fetchSubjects();
    } catch (error) {
      console.error("Error deleting Subject:", error);
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
                <th>Subject Name</th>
                <th>Course Name</th>
                <th>Subject Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Subjects.map((subject, index) => (
                <tr key={subject._id}>
                  <td>{index + 1}</td>
                  <td>{subject.name}</td>
                  <td>{subject.courseName}</td>
                  <td>{subject.subjectCode}</td>
                  <td>
                    <MdDeleteForever
                      style={{
                        color: "red",
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                      onClick={() => handleDelete(subject._id)}
                    />
                    <FiEdit
                      style={{
                        color: "green",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(subject._id)}
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

export default AllSubjects;
