import React, { useState } from "react";
import "./course.css";
import toast from "react-hot-toast";
import axios from "axios";
function AddTeacher(onTeacherAdded) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [subjects, setSubjects] = useState("");
  const [teachingExperience, setTeachingExperience] = useState("");
  const [teachingHours, setTeachingHours] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/teacher/addteacher",
        { name: name, mobile: mobile, email: email, gender: gender, dateOfBirth:dateOfBirth, subjects:subjects, teachingExperience:teachingExperience,teachingHours:teachingHours},
        { withCredentials: true }
      );
      console.log("teachers added successfully:", response.data);
      // Call the onCourseAdded callback passed from the parent component
      onTeacherAdded();
      setName("");
      setMobile("");
      setEmail("");
      setGender("");
      setDateOfBirth("");
      setSubjects("");
      setTeachingExperience("");
      setTeachingHours("");

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="addcourse">
        <form onSubmit={handleSubmit}>
          <h2>Add a new Teachers Name</h2>
          <div className="form-group fullname">
            <label htmlFor="course">Teachers Name</label>
            <input
              type="text"
              id="Name"
              placeholder="Teachers Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group branch">
            <label htmlFor="branch">Mobile No</label>
            <input
              type="text"
              id="Mobile"
              placeholder="Mobile No"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="form-group branch">
            <label htmlFor="branch">Email</label>
            <input
              type="text"
              id="Email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group branch">
          <label htmlFor="branch">Gender </label>
          <input
            type="text"
            id="Gender"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />   
        </div>
        <div className="form-group branch">
          <label htmlFor="branch">Date of Birth</label>
          <input
            type="date"
            id="DateOfBirth"
            placeholder="Date Of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />   
        </div>
        <div className="form-group branch">
          <label htmlFor="branch">Subjects</label>
          <input
            type="text"
            id="Subjects"
            placeholder="Subjects"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
          />   
        </div>
        <div className="form-group branch">
          <label htmlFor="branch">Teaching Experience</label>
          <input
            type="text"
            id="TeachingExperience"
            placeholder="Teaching Experience"
            value={teachingExperience}
            onChange={(e) => setTeachingExperience(e.target.value)}
          />   
        </div>
        <div className="form-group branch">
          <label htmlFor="branch">Teaching Hours</label>
          <input
            type="text"
            id="TeachingHours"
            placeholder="Teaching Hours"
            value={teachingHours}
            onChange={(e) => setTeachingHours(e.target.value)}
          />   
        </div>
          <div className="form-group submit-btn">
            <input type="submit" value="Add  New Teachers" />
          </div>
        </form>
      </div>
    </>
  )
}

export default AddTeacher