import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import "./course.css";

function TeacherDetials() {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/teacher/allteacher"
      );
      setTeachers(response.data.data);
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

  const getSubjectNameById = (subjectId) => {
    const subject = subjects.find((subject) => subject._id === subjectId);
    return subject ? subject.name : "Subjct is removed";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:4000/api/v1/teacher/delete/${id}`, {
        withCredentials: true,
      });
      // After successful deletion, fetch courses again to update the list
      setTeachers();
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
                <th>Teacher Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>gender</th>
                <th>DOB</th>
                <th>subjects</th>
                <th>Experience</th>
                <th>Teaching Hours</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={teacher._id}>
                  <td>{index + 1}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.mobile}</td>
                  <td>{teacher.gender}</td>
                  <td>{formatDate(teacher.dateOfBirth)}</td>
                  <td>
                    {teacher.subjects.map((subjectId) => (
                      <span key={subjectId}>
                        {getSubjectNameById(subjectId)}
                        <br />
                      </span>
                    ))}
                  </td>
                  <td>{teacher.teachingExperience}</td>
                  <td>{teacher.teachingHours}</td>
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

export default TeacherDetials;
