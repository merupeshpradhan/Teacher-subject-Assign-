import React, { useState, useEffect } from "react";
import axios from "axios";
import AllocateSubject from "./AllocateSubject";
import AllocateDetials from "./AllocateDetials";

const AdminSubjectAllocation = () => {
  const [teacherAllocated, setTeacherAllocated] = useState([]);

  useEffect(() => {
    fetchAllocatedTeacher();
  }, []);

  const fetchAllocatedTeacher = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/allocation/AllocatedTeacher",
        { withCredentials: true }
      );
      setTeacherAllocated(response.data.data);
    } catch (error) {
      console.error("Error fetching Allocated Teacher:", error);
    }
  };

  const handleCourseAdded = () => {
    fetchAllocatedTeacher(); // Fetch courses again after adding a new course
  };
  return (
    <>
      <section className="subjectAllocation">
        <AllocateSubject onCourseAdded={handleCourseAdded} />
        <AllocateDetials
          teacherAllocated={teacherAllocated}
          fetchAllocatedTeacher={fetchAllocatedTeacher}
        />
      </section>
    </>
  );
};

export default AdminSubjectAllocation;
