import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../main";
import ClassesDetials from "./ClassesDetials";

const TeacherClasses = () => {
  const [teachers, setTeachers] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    if (user && user.email) {
      fetchTeachers(user.email);
    }
  }, [user]);
  // console.log(user);

  const fetchTeachers = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/teacher/teacherSubject/${user.email}`,
        { withCredentials: true }
      );

      const teacherData = response.data.data; // Extract teacher data from the response

      if (teacherData) {
        // If teacherData is not null or undefined
        setTeachers(teacherData); // Set the teachers state as an array containing the teacher object
      } else {
        setTeachers([]); // Set an empty array if teacherData is not available
      }
    } catch (error) {
      console.error("Error fetching Teachers:", error);
      setTeachers([]); // Set an empty array in case of an error
    }
  };
  const handleCourseAdded = () => {
    fetchTeachers(); // Fetch teachers again after adding a new course
  };
  // console.log(teachers._id);
  return (
    <>
      <section className="teacherData" style={{ margin: "50px 0px 0px 0px" }}>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <h4
            style={{
              color: "black",
              fontWeight: "600",
              borderBottom: "3px solid #ff68de",
            }}
          >
            Classes Time
          </h4>
        </div>
        <ClassesDetials teachers={teachers} fetchTeachers={fetchTeachers}/>
      </section>
    </>
  );
};

export default TeacherClasses;
