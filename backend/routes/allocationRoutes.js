import express from "express";
import {
  allocateTeacher,
  updateAllocation,
  deleteAllocation,
  getAllocatedTeacher,
  getAllocatedSubject,
} from "../controllers/allocationControllers.js";
import { isAuthorized } from "../middlewares/auth.js"; // Import the authorization middleware

const router = express.Router();

// Allocate a teacher route
router.post("/allocate", isAuthorized, allocateTeacher);

router.get("/allocatedTeacher", getAllocatedTeacher);

// Update an allocation route
router.put("/update/:id", isAuthorized, updateAllocation);

router.get("/allocatedsubject/:id", isAuthorized, getAllocatedSubject);

// Delete an allocation route
router.delete("/delete/:id", isAuthorized, deleteAllocation);

export default router;
