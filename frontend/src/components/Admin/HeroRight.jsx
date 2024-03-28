import React, { useState, useEffect } from "react";
import "./HeroRight.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const HeroRight = () => {
  const [subjects, setSubjects] = useState([]);

  // const fetchSubjects = async () => {
  //   try {
  //     const response = await axios.get('');
  //     setSubjects(response.data);
  //   } catch (error) {
  //     console.error('Error fetching subjects:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchSubjects();
  // }, []);

  return (
    <div>
      <h2 className="table-title">All Subjects</h2>
      <div className="w3-container">
        <table className="w3-table w3-striped w3-border">
          <tr className="w3-teal">
            <th>Sl. No</th>
            <th>Course Name</th>
            <th>Course Full Name</th>
            <th>Course Short Name</th>
            <th>Subject Code</th>
            <th>Action</th>
          </tr>
          {/* <tr>
          {subjects.map((subject, index) => (
            <tr key={subject._id}> 
              <td>{index + 1}</td>
              <td>{subject.courseName}</td>
              <td>{subject.courseFullName}</td>
              <td>{subject.courseShortName}</td>
              <td>{subject.subjectCode}</td>
              <td>
                <button className='w3-button w3-blue w3-hover-black' onClick={() => handleEdit(subject)}><MdEdit /></button>
                <button className="w3-button w3-red w3-hover-black" onClick={() => handleDelete(subject._id)}><MdDelete /></button>
              </td>
            </tr>
          ))}
          </tr> */}
          <tr>
            <td>Sam</td>
            <td>Sam</td>
            <td>Sam</td>
            <td>Sam</td>
            <td>Sam</td>
            <td>
              <MdEdit
                style={{ fontSize: "20px", margin: " 0 3px", color: "#31ba53" }}
                onClick={() => handleEdit(subject)}
              />
              <MdDelete
                style={{ fontSize: "20px", margin: " 0 3px", color: "#f14c4c" }}
                onClick={() => handleDelete(subject._id)}
              />
            </td>
          </tr>
          <tr>
            <td>Sam</td>
            <td>Sam</td>
            <td>Sam</td>
            <td>Sam</td>
            <td>Sam</td>
            <td>
              <MdEdit
                style={{ fontSize: "20px", margin: " 0 3px" }}
                onClick={() => handleEdit(subject)}
              />
              <MdDelete
                style={{ fontSize: "20px", margin: " 0 3px", color: "red" }}
                onClick={() => handleDelete(subject._id)}
              />
            </td>
          </tr>
          <tr>
            <td>Sam</td>
            <td>Sam</td>
            <td>Sam</td>
            <td>Sam</td>
            <td>Sam</td>
            <td>
              <MdEdit
                style={{ fontSize: "20px", margin: " 0 3px" }}
                onClick={() => handleEdit(subject)}
              />
              <MdDelete
                style={{ fontSize: "20px", margin: " 0 3px", color: "red" }}
                onClick={() => handleDelete(subject._id)}
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default HeroRight;
