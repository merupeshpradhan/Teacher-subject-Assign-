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

router.post("/addteacher", isAuthorized, createTeacher); // Create a new teacher
router.get("/allteacher", getTeachers); // Get all teachers
router.get("/teacherdetials/:id", getTeacherById); // Get a single teacher by ID
router.put("/update/:id", isAuthorized, updateTeacher); // Update a teacher by ID
router.delete("/delete/:id", isAuthorized, deleteTeacher); // Delete a teacher by ID
router.get("/teacherdata/:name", getTeacherByName); // Get a single teacher by name


export default router;
