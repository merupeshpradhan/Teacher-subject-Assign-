import React, { useState, useEffect } from "react";
import axios from "axios";
import AllocateSubject from "./AllocateSubject";
import FirstSemAllocateDetials from "./FirstSemAllocateDetials";

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
        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <h4
            style={{
              color: "black",
              fontWeight: "600",
              borderBottom: "3px solid #ff7700fa",
              borderRadius: "5px",
            }}
          >
            Subject Allocation
          </h4>
        </div>
        <div style={{ display: "flex", gap: "50px" }}>
          <AllocateSubject onCourseAdded={handleCourseAdded} />

          <FirstSemAllocateDetials
            teacherAllocated={teacherAllocated}
            fetchAllocatedTeacher={fetchAllocatedTeacher}
          />
        </div>
      </section>
    </>
  );
};

export default AdminSubjectAllocation;
