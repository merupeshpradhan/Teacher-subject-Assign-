import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import toast from "react-hot-toast";
import { MdOutlineSaveAs } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { MdEdit, MdDelete } from "react-icons/md";

function TeacherDetails({ teachers, fetchTeachers }) {
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedGender, setEditedGender] = useState("");
  const [editedDateOfBirth, setEditedDateOfBirth] = useState("");
  const [editedSubjects, setEditedSubjects] = useState([]);
  const [editedTeachingExperience, setEditedTeachingExperience] = useState("");
  const [editedTeachingHours, setEditedTeachingHours] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

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
    return subject ? subject.name : "Subject is deleted";
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const formattedDate = d.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleEdit = (
    id,
    name,
    mobile,
    email,
    gender,
    dateOfBirth,
    subjects,
    teachingExperience,
    teachingHours
  ) => {
    setEditTeacherId(id);
    setEditedName(name);
    setEditedMobile(mobile);
    setEditedEmail(email);
    setEditedGender(gender);
    setEditedDateOfBirth(formatDate(dateOfBirth));
    setEditedSubjects(subjects);
    setEditedTeachingExperience(teachingExperience);
    setEditedTeachingHours(teachingHours);
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/teacher/update/${id}`,
        {
          name: editedName,
          mobile: editedMobile,
          email: editedEmail,
          gender: editedGender,
          dateOfBirth: editedDateOfBirth,
          teachingExperience: editedTeachingExperience,
          teachingHours: editedTeachingHours,
        },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchTeachers();
      setEditTeacherId(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleCancelEdit = () => {
    setEditTeacherId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/teacher/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      fetchTeachers();
      toast.success("One teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting one teacher:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="details ">
        <h4 style={{fontWeight:"700",letterSpacing:"3px",color:"black",padding:"0px 0px 0px 20px" ,borderBottom: "3px solid #ff68de"}}>All Teachers</h4>
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
                <th>TeachingExperience</th>
                <th>TeachingHours</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(teachers) && teachers.map((teacher, index) => (
                <tr key={teacher._id}>
                  <td>{index + 1}</td>
                  <td>
                    {editTeacherId === teacher._id ? (
                      <input
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "180px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    ) : (
                      teacher.name
                    )}
                  </td>
                  <td>
                    {editTeacherId === teacher._id ? (
                      <input
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "120px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedMobile}
                        onChange={(e) => setEditedMobile(e.target.value)}
                      />
                    ) : (
                      teacher.mobile
                    )}
                  </td>
                  <td>
                    {editTeacherId === teacher._id ? (
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
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                    ) : (
                      teacher.email
                    )}
                  </td>
                  <td>
                    {editTeacherId === teacher._id ? (
                      <input
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "80px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedGender}
                        onChange={(e) => setEditedGender(e.target.value)}
                      />
                    ) : (
                      teacher.gender
                    )}
                  </td>
                  <td>
                    {editTeacherId === teacher._id ? (
                      <input
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "120px",
                          fontWeight: "500",
                        }}
                        type="date"
                        value={editedDateOfBirth}
                        onChange={(e) =>
                          setEditedDateOfBirth(e.target.value)
                        }
                      />
                    ) : (
                      formatDate(teacher.dateOfBirth)
                    )}
                  </td>
                  
                  <td style={{ textAlign: "center" }}>
                    {editTeacherId === teacher._id ? (
                      <input
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "50px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedTeachingExperience}
                        onChange={(e) =>
                          setEditedTeachingExperience(e.target.value)
                        }
                      />
                    ) : (
                      teacher.teachingExperience
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {editTeacherId === teacher._id ? (
                      <input
                        style={{
                          border: "1px solid",
                          borderColor: "#bacaf3",
                          outlineColor: "#5682f5",
                          color: "#673ab7",
                          padding: "3px",
                          width: "50px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedTeachingHours}
                        onChange={(e) =>
                          setEditedTeachingHours(e.target.value)
                        }
                      />
                    ) : (
                      teacher.teachingHours
                    )}
                  </td>
                  <td style={{ display: "flex" }}>
                    {editTeacherId === teacher._id ? (
                      <>
                        <MdOutlineSaveAs
                          style={{
                            color: "green",
                            fontSize: "20px",
                            margin: " 0 3px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSave(teacher._id)}
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
                              teacher._id,
                              teacher.name,
                              teacher.mobile,
                              teacher.email,
                              teacher.gender,
                              teacher.dateOfBirth,
                              teacher.subjects,
                              teacher.teachingExperience,
                              teacher.teachingHours
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
                          onClick={() => handleDelete(teacher._id)}
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

export default TeacherDetails;
