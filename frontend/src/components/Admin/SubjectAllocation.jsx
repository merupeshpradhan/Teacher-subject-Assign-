import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios, { all } from "axios";
import "./AdminCourse.css";

function SubjectAllocation() {
  const [subjectAllocation, setSubjectAllocation] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchSubjectAllocation();
    fetchSubjects();
    fetchCourse();
    fetchTeacher();
  }, []);

  const fetchSubjectAllocation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/allocation/AllocatedTeacher",
        { withCredentials: true }
      );
      setSubjectAllocation(response.data.data);
    } catch (error) {
      console.error("Error fetching Subject allocation Detials:", error);
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

  const fetchTeacher = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/teacher/allteacher"
      );
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching Teacher:", error);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/course");
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching Course:", error);
    }
  };

  const getSubjectNameById = (subjectId) => {
    const subject = subjects.find((subject) => subject._id === subjectId);
    return subject ? subject.name : "Subject is deleted";
  };
  const getCourseNameById = (courseId) => {
    const course = courses.find((course) => course._id === courseId);
    return course ? course.name : "Course is Deleted";
  };
  const getTeacherNameById = (teacherId) => {
    const teacher = teachers.find((teacher) => teacher._id === teacherId);
    return teacher ? teacher.name : "Teacher data Deleted";
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:4000/api/v1/allocation/${id}`, {
        withCredentials: true,
      });
      // After successful deletion, fetch courses again to update the list
      fetchSubjectAllocation();
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
                <th>Subject Name</th>
                <th>Course Name</th>
                <th>Teacher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjectAllocation.map((allocated, index) => (
                <tr key={allocated._id}>
                  <td>{index + 1}</td>
                  <td> {getSubjectNameById(allocated.subject)}</td>
                  <td>{getCourseNameById(allocated.course)}</td>
                  <td>{getTeacherNameById(allocated.teacher)}</td>
                  <td>
                    <MdDeleteForever
                      style={{
                        color: "red",
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                      onClick={() => handleDelete(allocated._id)}
                    />
                    <FiEdit
                      style={{
                        color: "green",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(allocated._id)}
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

export default SubjectAllocation;
