
import React from 'react'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'
import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import "./AdminCourse.css";


function CourseDetials() {
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

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:4000/api/v1/course/delete/${id}`,{ withCredentials: true });
      // After successful deletion, fetch courses again to update the list
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  return (
    <>
    <div className='Main' style={{display:"flex",justifycontent: "space-between"}}>
      <HeroLeft/>
      <HeroRight/>
    </div>
    </>
  )
}

export default CourseDetials;
