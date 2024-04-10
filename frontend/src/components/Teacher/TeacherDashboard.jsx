import React, { useState, useEffect } from "react";
import "./Admin.css";
import toast from "react-hot-toast";
import axios from "axios";

function TeacherDashboard({ onTeacherAdded }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [choice, setChoice] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [teachingExperience, setTeachingExperience] = useState("");
  const [teachingHours, setTeachingHours] = useState("");
  const [subjectId, setSubjectId] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Format date of birth
      const formattedDateOfBirth = new Date(dateOfBirth)
        .toISOString()
        .split("T")[0];

      const response = await axios.post(
        "http://localhost:4000/api/v1/teacher/addteacher",
        {
          choice: choice,
          subjects: subjectId,
          teachingExperience: teachingExperience,
          teachingHours: teachingHours,
        },
        { withCredentials: true }
      );
      // console.log(response); //to see its structure
      onTeacherAdded();
      setChoice("");
      setTeachingExperience("");
      setTeachingHours("");
      setSubjectId("");
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div
        className="addData"
        style={{ width: "100%", padding: "160px 0px 80px 20px" }}
      >
        <form onSubmit={handleSubmit}>
          <h2 style={{ margin: "0 0 10px" }}>Teacher Evaluation</h2>
          <div
            className="form-group choice"
            style={{ marginTop: "8px", marginBottom: "0px", display: "flex" }}
          ></div>
          <div className="form-group branch" style={{ marginBottom: "5px" }}>
            <label
              htmlFor="Subject"
              style={{ fontSize: "15px", marginBottom: "0px" }}
            >
              Subjects
            </label>
            <select
              id="Subject"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects &&
                subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group branch" style={{ marginBottom: "5px" }}>
            <label
              htmlFor="TeachingExperience"
              style={{ fontSize: "15px", marginBottom: "0px" }}
            >
              Teaching Experience
            </label>
            <input
              style={{ height: "30px" }}
              type="text"
              id="TeachingExperience"
              placeholder="Teaching Experience"
              value={teachingExperience}
              onChange={(e) => setTeachingExperience(e.target.value)}
            />
          </div>
          <div className="form-group branch" style={{ marginBottom: "5px" }}>
            <label
              htmlFor="TeachingHours"
              style={{ fontSize: "15px", marginBottom: "0px" }}
            >
              Teaching Hours
            </label>
            <input
              style={{ height: "30px" }}
              type="text"
              id="TeachingHours"
              placeholder="Teaching Hours"
              value={teachingHours}
              onChange={(e) => setTeachingHours(e.target.value)}
            />
          </div>
          <label style={{ fontSize: "15px", marginBottom: "0px" }}>
            Priority
          </label>
          <div style={{ display: "flex" }}>
            <label
              style={{
                display: "flex",
                width: "70px",
                alignItems: "center",
                marginBottom: "0px",
              }}
            >
              <input
                style={{ height: "15px" }}
                type="radio"
                name="choice"
                value="1"
                checked={choice === "1"}
                onChange={(e) => setChoice(e.target.value)}
              />
              1
            </label>
            <label
              style={{
                display: "flex",
                width: "70px",
                alignItems: "center",
                marginBottom: "0px",
              }}
            >
              <input
                style={{ height: "15px" }}
                type="radio"
                name="choice"
                value="2"
                checked={choice === "2"}
                onChange={(e) => setChoice(e.target.value)}
              />
              2
            </label>
            <label
              style={{
                display: "flex",
                width: "70px",
                alignItems: "center",
                marginBottom: "0px",
              }}
            >
              <input
                style={{ height: "15px" }}
                type="radio"
                name="choice"
                value="3"
                checked={choice === "3"}
                onChange={(e) => setChoice(e.target.value)}
              />
              3
            </label>
            <label
              style={{
                display: "flex",
                width: "70px",
                alignItems: "center",
                marginBottom: "0px",
              }}
            >
              <input
                style={{ height: "15px" }}
                type="radio"
                name="choice"
                value="4"
                checked={choice === "4"}
                onChange={(e) => setChoice(e.target.value)}
              />
              4
            </label>
            <label
              style={{
                display: "flex",
                width: "70px",
                alignItems: "center",
                marginBottom: "0px",
              }}
            >
              <input
                style={{ height: "15px" }}
                type="radio"
                name="choice"
                value="5"
                checked={choice === "5"}
                onChange={(e) => setChoice(e.target.value)}
              />
              5
            </label>
          </div>
          <div className="form-group submit-btn" style={{ marginTop: "20px" }}>
            <input
              type="submit"
              style={{ padding: "10px" }}
              value="Updated"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default TeacherDashboard;
