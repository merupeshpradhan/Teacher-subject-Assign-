import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Admin.css";
import { Context } from "../../main";

function ClassesDetials({ teachers, fetchTeachers }) {
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [allocatedSubject, setAllocatedSubject] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allocatedDetials, setAllocatedDetials] = useState([]);
  const { user } = useContext(Context);

  // console.log(teachers._id);

  useEffect(() => {
    fetchAllocatedSubject();
    fetchSubjects();
    fetchCourses();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/subject");
      setSubjects(response.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/course");
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const fetchAllocatedSubject = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/allocation/AllocatedTeacher"
      );
      setAllocatedSubject(response.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  // console.log(allocatedSubject);

  const getSubjectNameById = (subjectId) => {
    const subject = subjects.find((subject) => subject._id === subjectId);
    return subject ? subject.name : "Subject is deleted";
  };
  const getCourseNameById = (courseId) => {
    const course = courses.find((course) => course._id === courseId);
    return course ? course.name : "Subject is deleted";
  };


  // Filter allocated subjects for a specific teacher ID

  const teacherAllocatedSubjects = allocatedSubject.filter(
    (subject) => subject.teacher === teachers._id
  );
  // console.log(teacherAllocatedSubjects);

  return (
    <>
      <div className="details ">
        <div className="w3-container">
          <table className="w3-table w3-striped w3-border">
            <thead>
              <tr className="w3-teal">
                <th>Sl. No</th>
                <th>Course Name</th>
                <th>Semester</th>
                {/* <th>Branch</th> */}
                <th>Subject Name</th>
                <th>Class Time</th>
              </tr>
            </thead>
            <tbody>
              {teacherAllocatedSubjects.map((allocated, index) => (
                <tr key={allocated._id}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      getCourseNameById(allocated.course)
                    }
                  </td>
                  <td>
                    {allocated.semester}
                  </td>
                  <td>
                    {
                      getSubjectNameById(allocated.subject)
                    }
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ClassesDetials;
