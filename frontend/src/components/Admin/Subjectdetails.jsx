import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import toast from "react-hot-toast";
import { MdOutlineSaveAs } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { MdEdit, MdDelete } from "react-icons/md";

function Subjectdetails({ subjects, fetchSubjects }) {
  const [editSubjectId, setEditSubjectId] = useState(null);
  const [editedSubjectName, setEditedSubjectName] = useState("");
  const [editedCourse, setEditedCourse] = useState("");
  const [editedShortName, setEditedShortName] = useState("");
  const [editedCode, setEditedCode] = useState("");

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

  const handleEdit = (id, name, course, shortName, subjectCode) => {
    setEditSubjectId(id);
    setEditedSubjectName(name);
    setEditedCourse(course);
    setEditedShortName(shortName);
    setEditedCode(subjectCode);
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/subject/${id}`,
        {
          name: editedSubjectName,
          courseName: editedCourse,
          subjectShortName: editedShortName,
          subjectCode: editedCode,
        },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchSubjects();
      setEditSubjectId(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCancelEdit = () => {
    setEditSubjectId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/subject/${id}`, {
        withCredentials: true,
      });
      fetchSubjects();
      toast.success("Subject deleted successfully");
    } catch (error) {
      console.error("Error deleting Subject:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="details ">
        <h4>All Subjects</h4>
        <div className="w3-container">
          <table className="w3-table w3-striped w3-border">
            <thead>
              <tr className="w3-teal">
                <th>Sl. No</th>
                <th>Subject Name</th>
                <th>Course Name</th>
                <th>Subject Short Name</th>
                <th>Subject Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject._id}>
                  <td>{index + 1}</td>
                  <td>
                    {editSubjectId === subject._id ? (
                      <input
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "150px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedSubjectName}
                        onChange={(e) => setEditedSubjectName(e.target.value)}
                      />
                    ) : (
                      subject.name
                    )}
                  </td>
                  <td>
                    {editSubjectId === subject._id ? (
                      <select
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "150px",
                          fontWeight: "500",
                        }}
                        id="course"
                        value={editedCourse}
                        onChange={(e) => setEditedCourse(e.target.value)}
                      >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                          <option key={course.name} value={course.name}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      subject.courseName
                    )}
                  </td>
                  <td>
                    {editSubjectId === subject._id ? (
                      <input
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "150px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedShortName}
                        onChange={(e) => setEditedShortName(e.target.value)}
                      />
                    ) : (
                      subject.subjectShortName
                    )}
                  </td>
                  <td>
                    {editSubjectId === subject._id ? (
                      <input
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "150px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedCode}
                        onChange={(e) => setEditedCode(e.target.value)}
                      />
                    ) : (
                      subject.subjectCode
                    )}
                  </td>
                  <td style={{ display: "flex" }}>
                    {editSubjectId === subject._id ? (
                      <>
                        <MdOutlineSaveAs
                          style={{
                            color: "green",
                            fontSize: "20px",
                            margin: " 0 3px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSave(subject._id)}
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
                              subject._id,
                              subject.name,
                              subject.courseName,
                              subject.subjectShortName,
                              subject.subjectCode
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
                          onClick={() => handleDelete(subject._id)}
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

export default Subjectdetails;
