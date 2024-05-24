import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import "./Teacher.css";

function AddSubject({ onTeacherAdded }) {
  const { user } = useContext(Context);
  const [subjectId, setSubjectId] = useState("");
  const [subjectTeachingExperience, setSubjectTeachingExperience] =
    useState("");
  const [preference, setPreference] = useState("");
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
      const selectedSubject = subjects.find(
        (subject) => subject._id === subjectId
      );
      if (!selectedSubject) {
        toast.error("Please select a valid subject");
        return;
      }

      //   const { type, teaching_experience, preference } = selectedSubject;

      const response = await axios.post(
        `http://localhost:4000/api/v1/teacher/${user.email}/addsubject`,
        {
          subjectId: selectedSubject._id,
          subjectTeachingExperience,
          preference,
        },
        { withCredentials: true }
      );
      // Handle success feedback
      toast.success(response.data.message);
      onTeacherAdded();
      setSubjectId("");
      setSubjectTeachingExperience("");
      setPreference("");
    } catch (error) {
      // console.error("Error adding subject to teacher:", error);
      toast.error(error.response?.data?.message || "An error occurred");
      setSubjectId("");
      setSubjectTeachingExperience("");
      setPreference("");
    }
  };

  return (
    <div className="addData">
      <form onSubmit={handleSubmit}>
        <h2 style={{ margin: "0 0 10px" }}>Teacher Evaluation</h2>
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
            {subjects.map((subject) => (
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
            type="text"
            id="TeachingExperience"
            placeholder="Teaching Experience"
            value={subjectTeachingExperience}
            onChange={(e) => setSubjectTeachingExperience(e.target.value)}
          />
        </div>
        <div
          className="form-group branch"
          style={{ marginBottom: "5px", marginTop: "7px" }}
        >
          <label
            htmlFor="Preference"
            style={{ fontSize: "15px", marginBottom: "2px" }}
          >
            Preference
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
                style={{ height: "20px" }}
                type="radio"
                name="preference"
                value="1"
                checked={preference === "1"}
                onChange={(e) => setPreference(e.target.value)}
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
                style={{ height: "20px" }}
                type="radio"
                name="preference"
                value="2"
                checked={preference === "2"}
                onChange={(e) => setPreference(e.target.value)}
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
                style={{ height: "20px" }}
                type="radio"
                name="preference"
                value="3"
                checked={preference === "3"}
                onChange={(e) => setPreference(e.target.value)}
              />
              3
            </label>
          </div>
        </div>
        <div className="form-group submit-btn" style={{ marginTop: "20px",display:"flex",justifyContent:"center",justifyItems:"center"}}>
          <input
            type="submit"
            style={{ padding: "10px" }}
            value="Add Subject"
          />
        </div>
      </form>
    </div>
  );
}

export default AddSubject;
