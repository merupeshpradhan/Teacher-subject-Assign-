import express from "express";
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeacherByName,
} from "../controllers/teacherController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthorized, createTeacher); // Create a new teacher
router.get("/", getTeachers); // Get all teachers
router.get("/:id", getTeacherById); // Get a single teacher by ID
router.put("/:id", isAuthorized, updateTeacher); // Update a teacher by ID
router.delete("/:id", isAuthorized, deleteTeacher); // Delete a teacher by ID
router.get("/name/:name", getTeacherByName); // Get a single teacher by name

export default router;
