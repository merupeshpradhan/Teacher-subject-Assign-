import express from "express";
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  getTeacherByEmail,
  updateTeacher,
  deleteTeacher,
  getTeacherByName,
  addSubjectToTeacher,
  updateSubject,
  deleteSubject
} from "../controllers/teacherController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addteacher", isAuthorized, createTeacher); // Create a new teacher
router.get("/allteacher", getTeachers); // Get all teachers
router.get("/teacherdetials/:id", getTeacherById); // Get a single teacher by ID
router.put("/update/:id", isAuthorized, updateTeacher); // Update a teacher by ID
router.delete("/delete/:id", isAuthorized, deleteTeacher); // Delete a teacher by ID
router.get("/teacherdata/:name", getTeacherByName); // Get a single teacher by name
router.get("/teacherSubject/:email", getTeacherByEmail); // Get a single teacher by Email
router.post('/:email/addsubject', addSubjectToTeacher); // New route to update teacher subjects by email
// Route for updating a subject for a teacher
router.put('/:teacherId/update/:subjectId',updateSubject);
// Route for deleting a subject from a teacher
router.delete('/:teacherId/subjects/:subjectId', deleteSubject);


export default router;
