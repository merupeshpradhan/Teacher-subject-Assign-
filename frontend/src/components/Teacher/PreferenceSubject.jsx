import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineSaveAs, MdEdit, MdDelete } from "react-icons/md";
import { GiCancel } from "react-icons/gi";

function PreferenceSubject({ teachers, fetchTeachers }) {
  const [editSubjectId, setEditSubjectId] = useState(null);
  const [editedSubjectTeachingExperience, setEditedSubjectTeachingExperience] =
    useState("");
  const [editedPreference, setEditedPreference] = useState("");
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
    const subject = subjects.find((subj) => subj._id === subjectId);
    return subject ? subject.name : "Subject is deleted";
  };

  const handleEdit = (id, subjectTeachingExperience, preference) => {
    setEditSubjectId(id);
    setEditedSubjectTeachingExperience(subjectTeachingExperience);
    setEditedPreference(preference);
  };

  const handleSave = async (teacherId, subjectId) => {
    // console.log(subjectId);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/teacher/${teacherId}/update/${subjectId}`,
        {
          subject: editSubjectId,
          teachingExperience: editedSubjectTeachingExperience,
          preference: editedPreference,
        },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchTeachers();
      setEditSubjectId(null);
    } catch (error) {
      console.error("Error updating subject:", error);
      toast.error(error.response.data.message || "Failed to update subject");
    }
  };

  const handleCancelEdit = () => {
    setEditSubjectId(null);
  };

  const handleDelete = async (teacherId, subjectId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/teacher/${teacherId}/subjects/${subjectId}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Subject deleted successfully");
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast.error(error.response?.data?.message || "Failed to delete subject");
    }
  };

  return (
    <div className="details">
      <div className="w3-container">
        <table className="w3-table w3-striped w3-border">
          <thead>
            <tr className="w3-teal">
              <th>Sl. No</th>
              <th>Subject Name</th>
              <th>Experience Of Teaching</th>
              <th>Preference</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) =>
              teacher.subjects.map((subject, index) => (
                <tr key={`${subject._id}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{getSubjectNameById(subject.subject)}</td>
                  <td>
                    {editSubjectId === subject._id ? (
                      <input
                        style={{
                          border: "1px solid #bacaf3",
                          padding: "3px",
                          width: "150px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedSubjectTeachingExperience}
                        onChange={(e) =>
                          setEditedSubjectTeachingExperience(e.target.value)
                        }
                      />
                    ) : (
                      subject.subject_teaching_experience
                    )}
                  </td>
                  {/* <td>{subject.subject_teaching_experience}</td> */}
                  <td>
                    {editSubjectId === subject._id ? (
                      <input
                        style={{
                          border: "1px solid #bacaf3",
                          padding: "3px",
                          width: "150px",
                          fontWeight: "500",
                        }}
                        type="text"
                        value={editedPreference}
                        onChange={(e) => setEditedPreference(e.target.value)}
                      />
                    ) : (
                      subject.preference
                    )}
                  </td>
                  {/* <td>{subject.preference}</td> */}
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
                          onClick={() => handleSave(teacher._id, subject._id)}
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
                            color: "green",
                            fontSize: "20px",
                            margin: " 0 3px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleEdit(
                              subject._id,
                              subject.subject_teaching_experience,
                              subject.preference
                            )
                          }
                        />
                        <MdDelete
                          style={{
                            color: "red",
                            fontSize: "20px",
                            margin: " 0 3px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(teacher._id, subject._id)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PreferenceSubject;
