import express from "express";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourseByName,
  getAllCourses,
  getCourseById,
} from "../controllers/CourseController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addcourse", isAuthorized, createCourse); // Create a new course
router.put("/update/:id", isAuthorized, updateCourse); // Update a course by ID
router.delete("/delete/:id", isAuthorized, deleteCourse); // Delete a course by ID
router.get("/searchbyid/:id", isAuthorized, getCourseById); // get course by ID
router.get("/searchbyname/:name", isAuthorized, searchCourseByName); // Search for courses by name
router.get("/", getAllCourses); // get all Course

export default router;
