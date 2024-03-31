import React, { useState, useEffect } from "react";
import axios from "axios";
import "./course.css";
import toast from "react-hot-toast";
import { MdOutlineSaveAs } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { MdEdit, MdDelete } from "react-icons/md";
function Subjectdetails({ subjects, fetchSubjects })
 {
    const [editSubjectId, setEditSubjectId] = useState(null);
    const [editedSubjectName, setEditedSubjectName] = useState("");
    const [editedCourse, setEditeCourse] = useState("");
    const [editedShortName, setEditedShortName] = useState("");
    const [editedCode, setEditeCode] = useState("");


  
    const handleEdit = (id, name, course,shortName,subjectCode) => {
      setEditSubjectId(id);
      setEditedSubjectName(name);
      setEditeCourse(course);
      setEditedShortName(shortName);
      setEditeCode(subjectCode);

    };
  
    const handleSave = async (id) => {
      try {
        const response =await axios.put(
          `http://localhost:4000/api/v1/subject/${id}`,
          { name: editedSubjectName,course : editedCourse,subjectShortName:editedShortName,subjectCode:editedCode },
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
      <div className="coursedetails">
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
                        style={{ padding: "3px" }}
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
                      <input
                        style={{ padding: "3px" }}
                        type="text"
                        value={editedCourse}
                        onChange={(e) => setEditeCourse(e.target.value)}
                      />
                    ) : (
                      subject.courseName
                    )}
                  </td>
                  <td>
                    {editSubjectId === subject._id ? (
                      <input
                        style={{ padding: "3px" }}
                        type="text"
                        value={setEditedShortName}
                        onChange={(e) => setEditedShortName(e.target.value)}
                      />
                    ) : (
                      subject.subjectShortName
                    )}
                  </td>
                  <td>
                    {editSubjectId === subject._id ? (
                      <input
                        style={{ padding: "3px" }}
                        type="text"
                        value={editedCode}
                        onChange={(e) => setEditeCode(e.target.value)}
                      />
                    ) : (
                      subject.subjectCode
                    )}
                  </td>
                  <td>
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
                            handleEdit(subject._id, subject.name, subject.course,subject.subjectShortName,subject.subjectCode)
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
    </>  )
}

export default Subjectdetails