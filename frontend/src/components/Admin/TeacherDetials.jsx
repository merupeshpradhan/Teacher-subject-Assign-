import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./course.css";
import toast from "react-hot-toast";
import { MdOutlineSaveAs } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { MdEdit, MdDelete } from "react-icons/md";

function TeacherDetials({teachers,fetchTeachers}) {
  const [editTeachersId, setEditTeachersId] = useState(null);
  // const [editedTeachersName, setEditedTeachersName] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedGender, setEditedGender] = useState("");
  const [editedDateOfBirth, setEditedDateOfBirth] = useState("");
  const [editedSubjects, setEditedSubjects] = useState("");
  const [editedTeachingExperience, setEditedTeachingExperience] = useState("");
  const [editedTeachingHours, setEditedTeachingHours] = useState("");

  const handleEdit = (id, name, mobile,email,gender,dateOfBirth,subjects,teachingExperience,teachingHours) => {
    setEditTeachersId(id);
    setEditedName(name);
    setEditedMobile(mobile);
    setEditedEmail(email);
    setEditedGender(gender);
    setEditedDateOfBirth(dateOfBirth);
    setEditedSubjects(subjects);
    setEditedTeachingExperience(teachingExperience);
    setEditedTeachingHours(teachingHours);

  };


  const handleSave = async (id) => {
    try {
      const response =await axios.put(
        `http://localhost:4000/api/v1/teacher/allteacher/${id}`,
        { name: editedName,mobile : editedMobile,email:editedEmail,gender:editedGender,dateOfBirth:editedDateOfBirth,subjects:editedSubjects,teachingExperience:editedTeachingExperience,teachingHours:editedTeachingHours },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchTeachers();
      setEditTeachersId(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCancelEdit = () => {
    setEditTeachersId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/teacher/allteacher/${id}`, {
        withCredentials: true,
      });
      fetchTeachers();
      toast.success("One teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting one teachers:", error);
      toast.error(error.response.data.message);
    }
  };
    return (
      <>
            <div className="teachersdetails">
              <h4>All Teachers</h4>
              <div className="w3-container">
                <table className="w3-table w3-striped w3-border">
                  <thead>
                    <tr className="w3-teal">
                      <th>Sl. No</th>
                      <th>Teachers Name</th>
                      <th>Mobile No</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>DateOfBirth</th>
                      <th>Subject</th>
                      <th>TeachingExperience</th>
                      <th>TeachingHours</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teachers, index) => (
                      <tr key={teachers._id}>
                        <td>{index + 1}</td>
                        <td>
                          {editTeachersId === teachers._id ? (
                            <input
                              style={{ padding: "3px" }}
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                            />
                          ) : (
                            teachers.name
                          )}
                        </td>
                        <td>
                          {editTeachersId === teachers._id ? (
                            <input
                              style={{ padding: "3px" }}
                              type="text"
                              value={editedMobile}
                              onChange={(e) => setEditedMobile(e.target.value)}
                            />
                          ) : (
                            teachers.mobile
                          )}
                        </td>
                        <td>
                          {editTeachersId === teachers._id ? (
                            <input
                              style={{ padding: "3px" }}
                              type="text"
                              value={editedEmail}
                              onChange={(e) => setEditedEmail(e.target.value)}
                            />
                          ) : (
                            teachers.email
                          )}
                        </td>
                        <td>
                          {editTeachersId === teachers._id ? (
                            <input
                              style={{ padding: "3px" }}
                              type="text"
                              value={editedGender}
                              onChange={(e) => setEditedGender(e.target.value)}
                            />
                          ) : (
                            teachers.gender
                          )}
                        </td>
                        <td>
                          {editTeachersId === teachers._id ? (
                            <input
                              style={{ padding: "3px" }}
                              type="text"
                              value={editedDateOfBirth}
                              onChange={(e) => setEditedDateOfBirth(e.target.value)}
                            />
                          ) : (
                            teachers.dateOfBirth
                          )}
                        </td>
                        <td>
                          {editTeachersId === teachers._id ? (
                            <input
                              style={{ padding: "3px" }}
                              type="text"
                              value={editedSubjects}
                              onChange={(e) => setEditedSubjects(e.target.value)}
                            />
                          ) : (
                            teachers.subjects
                          )}
                        </td>
                        <td>
                          {editTeachersId === teachers._id ? (
                            <input
                              style={{ padding: "3px" }}
                              type="text"
                              value={editedTeachingExperience}
                              onChange={(e) => setEditedTeachingExperience(e.target.value)}
                            />
                          ) : (
                            teachers.teachingExperience
                          )}
                        </td>
                        <td>
                          {editTeachersId === teachers._id ? (
                            <input
                              style={{ padding: "3px" }}
                              type="text"
                              value={editedTeachingHours}
                              onChange={(e) => setEditedTeachingHours(e.target.value)}
                            />
                          ) : (
                            teachers.teachingHours
                          )}
                        </td>
                        <td>
                          {ediTeachersId === teachers._id ? (
                            <>
                              <MdOutlineSaveAs
                                style={{
                                  color: "green",
                                  fontSize: "20px",
                                  margin: " 0 3px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleSave(teachers._id)}
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
                                  handleEdit(teachers._id, teachers.name, teachers.mobile,teachers.email,teachers.gender,teachers.dateOfBirth,teachers.subjects,teachers.teachingExperience,teachers.teachingHours)
                                }
                              />
                              <MdDelete
                                style={{
                                  fontSize: "20px",
                                  margin: " 0 3px",
                                  color: "#f94242",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDelete(teachers._id)}
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
  
export default TeacherDetials