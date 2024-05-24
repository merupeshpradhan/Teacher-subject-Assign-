import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddTeacher({ onTeacherAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobile: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    teachingExperience: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/teacher/addteacher",
        formData,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setFormData({
        name: "",
        role: "",
        mobile: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        teachingExperience: "",
      });
      onTeacherAdded(); // Trigger callback if needed
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add teacher");
    }
  };

  return (
    <div className="addData">
      <form onSubmit={handleSubmit}>
        <h2 style={{ margin: "0 0 10px" }}>Add a new Teacher</h2>

        <div className="form-sections">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="name">Teacher's Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile No</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="teachingExperience">Teaching Experience</label>
              <input
                type="number"
                id="teachingExperience"
                name="teachingExperience"
                value={formData.teachingExperience}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-group gender">
          <label>Gender</label>
          <div className="gender-options">
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                style={{ width: "25px" }}
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                style={{ width: "25px" }}
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className="form-group submit-btn" style={{ marginTop: "20px" }}>
          <input type="submit" style={{ padding: "10px" }} />
        </div>
      </form>
      <style>
        {`
          .form-sections {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .form-column {
          flex: 1;
          padding: 10px;
        }
        .gender-options {
          display: flex;
          gap: 20px;
        }

        .gender-options input[type="radio"] {
          height: 15px;
          width: 15px;
          margin-right: 5px;
        }
        `}
      </style>
    </div>
  );
}

export default AddTeacher;
