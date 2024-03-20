import express from "express";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourseByName,
  getAllCourses
} from "../controllers/CourseController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthorized, createCourse); // Create a new course
router.put("/:id", isAuthorized, updateCourse); // Update a course by ID
router.delete("/:id", isAuthorized, deleteCourse); // Delete a course by ID
router.get("/search/:name", isAuthorized, searchCourseByName); // Search for courses by name
router.get("/", getAllCourses); // get all Course

export default router;