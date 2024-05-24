import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import toast from "react-hot-toast";
import { MdOutlineSaveAs } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { MdEdit, MdDelete } from "react-icons/md";

function AllocateDetails({ teacherAllocated, fetchAllocatedTeacher }) {
  const [editedAllocatedId, setEditedAllocatedId] = useState(null);
  const [editedTeacher, setEditedTeacher] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState([]);

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchSubjects();
    fetchCourse();
    fetchTeacher();
  }, []);

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

  const handleEdit = (id,teacher) => {
    setEditedAllocatedId(id);
    setEditedTeacher(teacher);

    // Find the allocated subject by id
    const allocatedSubject = teacherAllocated.find(
      (allocation) => allocation._id === id
    );

    // Get the teacher names for the allocated subject
    const teacherNames = allocatedSubject.scores.map((score) =>
      (score.teacher)
    );

    // Set the selected teacher names for the dropdown
    setSelectedTeacher(teacherNames);
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

  const handleCancelEdit = () => {
    // Reset the state values to clear the edited fields
    setEditedAllocatedId(null);
    setEditedSubject("");
    setEditedCourse("");
    setEditedTeacher("");
    setSelectedTeacher([]);
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/allocation/update/${id}`,
        {
          teacher: editedTeacher,
        },
        { withCredentials: true }
      );
      fetchAllocatedTeacher();
      toast.success(response.data.message);
      // Reset the state values to clear the edited fields
      setEditedAllocatedId(null);
      setEditedTeacher("");
      setSelectedTeacher([]);
    } catch (error) {
      console.error("Error updating allocation:", error);
      toast.error("Failed to update allocation");
    }
  };

    const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/allocation/delete/${id}`, {
        withCredentials: true,
      });
      fetchAllocatedTeacher();
      toast.success("Allocated teacher deleted successfully");
    } catch (error) {
      // console.error("Error deleting course:", error);
      toast.error(error.response.data.message);
    }
  };

  const firstSemAllocated = teacherAllocated.filter(
    (allocated) => allocated.semester === "1st Sem"
  );

  return (
    <>
      <div className="details" style={{height:"100%"}}>
        <h4 style={{fontWeight:"700",letterSpacing:"3px",color:"black",padding:"0px 0px 0px 20px" ,borderBottom: "3px solid #ff7700fa"}}>1st Semester Allocated Teachers</h4>
        <div className="w3-container">
          <table className="w3-table w3-striped w3-border">
            <thead>
              <tr className="table-header">
                <th>Sl. No</th>
                <th>Subject Name</th>
                <th>Semester</th>
                <th>Course Name</th>
                <th>Teacher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {firstSemAllocated.map((allocated, index) => (
                <tr key={allocated._id}>
                  <td>{index + 1}</td>
                  <td>{getSubjectNameById(allocated.subject)}</td>
                  <td>{allocated.semester}</td>
                  <td>{getCourseNameById(allocated.course)}</td>
                  <td>
                    {editedAllocatedId === allocated._id ? (
                      <select
                        style={{
                          border: "1px solid",
                          width: "150px",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          fontWeight: "500",
                        }}
                        value={editedTeacher} // Display the selected teachers
                        onChange={(e) => setEditedTeacher(e.target.value)}
                      >
                        <option value="">Select Teacher</option>
                        {selectedTeacher.map((teacherName) => (
                          <option key={teacherName} value={teacherName}>
                            {getTeacherNameById(teacherName)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      getTeacherNameById(allocated.teacher)
                    )}
                  </td>
                  <td>
                    {editedAllocatedId === allocated._id ? (
                      <>
                        <MdOutlineSaveAs
                          style={{
                            color: "green",
                            fontSize: "20px",
                            margin: " 0 3px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSave(allocated._id)}
                        />

                        <GiCancel
                          style={{
                            color: "red",
                            fontSize: "20px",
                            margin: " 0 3px",
                            cursor: "pointer",
                          }}
                          onClick={handleCancelEdit}
                        />
                      </>
                    ) : (
                      <>
                        <MdEdit
                          style={{
                            fontSize: "20px",
                            margin: " 0 3px",
                            color: "#0080009c",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleEdit(
                              allocated._id,
                              allocated.teacher
                            )
                          }
                        />
                        <MdDelete
                          style={{
                            fontSize: "20px",
                            margin: " 0 3px",
                            color: "#f94242",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(allocated._id)}
                        />
                      </>
                    )}
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

export default AllocateDetails;
