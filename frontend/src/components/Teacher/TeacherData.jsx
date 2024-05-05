import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddSubject from "./AddSubject";
import TeacherDetials from "./TeacherDetials";
import PreferenceSubject from "./PreferenceSubject";
import { Context } from "../../main";

function TeacherData() {
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
        setTeachers([teacherData]); // Set the teachers state as an array containing the teacher object
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
  return (
    <>
      <section
        className="teacherData"
        style={{ margin: "50px 0px 0px 79px", minHeight: "50vh" }}
      >
        <AddSubject onTeacherAdded={handleCourseAdded} />
      </section>
      <h4
        style={{
          background: "white",
          fontWeight: "700",
          letterSpacing: "3px",
          color: "#03A9F4",
          padding: "5px 0px 5px 100px",
        }}
      >
        Subject Preference
      </h4>
      <section className="teacherData" style={{ margin: "0px 0px 0px 79px"}}>
        <PreferenceSubject teachers={teachers} fetchTeachers={fetchTeachers} />
      </section>
    </>
  );
}

export default TeacherData;