import React, { useState } from "react";
import "./HeroLeft.css";

const HeroLeft = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Create A New Subject</h2>
        <div className="form-group fullname">
          <label htmlFor="fullname">Course Name</label>
          <select
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          >
            <option value="" disabled>
              Select Course
            </option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>
        </div>
        <div className="form-group email">
          <label htmlFor="email">Subject Full Name</label>
          <input
            type="text"
            id="email"
            placeholder="Subject Full Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group password">
          <label htmlFor="password">Subject Short Name</label>
          <input
            type="text"
            id="password"
            placeholder="Subject Short Name"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group date">
          <label htmlFor="date">Subject Code</label>
          <input
            type="text"
            id="date"
            placeholder="Subject Code"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div className="form-group submit-btn">
          <input type="submit" value="Submit" />
        </div>
      </form>

      
    </>
  );
};

export default HeroLeft;
