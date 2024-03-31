import React, { useState, useEffect } from "react";
import axios from "axios";
import "./course.css";
import toast from "react-hot-toast";
import { MdOutlineSaveAs } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { MdEdit, MdDelete } from "react-icons/md";

function CourseDetails({ courses, fetchCourses }) {
  const [editCourseId, setEditCourseId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedBranch, setEditedBranch] = useState("");

  const handleEdit = (id, name, branch) => {
    setEditCourseId(id);
    setEditedName(name);
    setEditedBranch(branch);
  };

  const handleSave = async (id) => {
    try {
      const response =await axios.put(
        `http://localhost:4000/api/v1/course/update/${id}`,
        { name: editedName, branch: editedBranch },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchCourses();
      setEditCourseId(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCancelEdit = () => {
    setEditCourseId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/course/delete/${id}`, {
        withCredentials: true,
      });
      fetchCourses();
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="coursedetails">
        <h4>All Courses</h4>
        <div className="w3-container">
          <table className="w3-table w3-striped w3-border">
            <thead>
              <tr className="w3-teal">
                <th>Sl. No</th>
                <th>Course Name</th>
                <th>Branch Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>
                    {editCourseId === course._id ? (
                      <input
                        style={{ padding: "3px" }}
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    ) : (
                      course.name
                    )}
                  </td>
                  <td>
                    {editCourseId === course._id ? (
                      <input
                        style={{ padding: "3px" }}
                        type="text"
                        value={editedBranch}
                        onChange={(e) => setEditedBranch(e.target.value)}
                      />
                    ) : (
                      course.branch
                    )}
                  </td>
                  <td>
                    {editCourseId === course._id ? (
                      <>
                        <MdOutlineSaveAs
                          style={{
                            color: "green",
                            fontSize: "20px",
                            margin: " 0 3px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSave(course._id)}
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
                            handleEdit(course._id, course.name, course.branch)
                          }
                        />
                        <MdDelete
                          style={{
                            fontSize: "20px",
                            margin: " 0 3px",
                            color: "#f94242",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(course._id)}
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

export default CourseDetails;
