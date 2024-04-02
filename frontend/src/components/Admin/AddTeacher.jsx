import React, { useState, useEffect } from "react";
import "./Admin.css";
import toast from "react-hot-toast";
import axios from "axios";

function AddTeacher({ onTeacherAdded }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
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
          name: name,
          mobile: mobile,
          email: email,
          gender: gender,
          dateOfBirth: formattedDateOfBirth,
          subjects: subjectId,
          teachingExperience: teachingExperience,
          teachingHours: teachingHours,
        },
        { withCredentials: true }
      );
      // console.log(response); //to see its structure
      onTeacherAdded();
      setName("");
      setMobile("");
      setEmail("");
      setGender("");
      setDateOfBirth("");
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
        style={{ width: "100%", padding: "0 20px 20px 20px" }}
      >
        <form onSubmit={handleSubmit}>
          <h2 style={{ margin: "0 0 10px" }}>Add a new Teacher</h2>
          <div className="form-group fullname" style={{ marginBottom: "5px" }}>
            <label
              htmlFor="Name"
              style={{ fontSize: "15px", marginBottom: "0px" }}
            >
              Teachers Name
            </label>
            <input
              style={{ height: "30px" }}
              type="text"
              id="Name"
              placeholder="Teachers Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group branch" style={{ marginBottom: "5px" }}>
            <label
              htmlFor="Mobile"
              style={{ fontSize: "15px", marginBottom: "0px" }}
            >
              Mobile No
            </label>
            <input
              style={{ height: "30px" }}
              type="text"
              id="Mobile"
              placeholder="Mobile No"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="form-group branch" style={{ marginBottom: "5px" }}>
            <label
              htmlFor="Email"
              style={{ fontSize: "15px", marginBottom: "0px" }}
            >
              Email
            </label>
            <input
              style={{ height: "30px" }}
              type="text"
              id="Email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            className="form-group gender"
            style={{ marginTop: "8px", marginBottom: "0px", display: "flex" }}
          >
            <label style={{ fontSize: "15px", marginBottom: "0px" }}>
              Gender
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
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label
                style={{
                  display: "flex",
                  width: "90px",
                  alignItems: "center",
                  marginBottom: "0px",
                }}
              >
                <input
                  style={{ height: "15px" }}
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>
          <div className="form-group branch" style={{ marginBottom: "5px" }}>
            <label
              htmlFor="DateOfBirth"
              style={{ fontSize: "15px", marginBottom: "0px" }}
            >
              Date of Birth
            </label>
            <input
              style={{ height: "30px" }}
              type="date"
              id="DateOfBirth"
              placeholder="Date Of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
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
          <div className="form-group submit-btn" style={{ marginTop: "20px" }}>
            <input
              type="submit"
              style={{ padding: "10px" }}
              value="Add New Teacher"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTeacher;
