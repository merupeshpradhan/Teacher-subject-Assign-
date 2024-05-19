import { useState, useEffect } from "react";
import axios from "axios";
import CourseDetials from "./CourseDetials";
import AddCourse from "./AddCourse";

function AdminCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/course");
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCourseAdded = () => {
    fetchCourses(); // Fetch courses again after adding a new course
  };

  return (
    <>
      <section className="coursePage">
        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <h4
            style={{
              color: "black",
              fontWeight: "600",
              borderBottom: "3px solid #ff68de",
            }}
          >
            Courses
          </h4>
        </div>
        <AddCourse onCourseAdded={handleCourseAdded} />
        <CourseDetials courses={courses} fetchCourses={fetchCourses} />
      </section>
    </>
  );
}

export default AdminCourses;
