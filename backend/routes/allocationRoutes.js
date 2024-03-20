import express from 'express';
import { allocateTeacher, updateAllocation, deleteAllocation } from '../controllers/allocationControllers.js';
import { isAuthorized } from '../middlewares/auth.js'; // Import the authorization middleware

const router = express.Router();

// Allocate a teacher route
router.post('/allocate', isAuthorized, allocateTeacher);

// Update an allocation route
router.put('/:id', isAuthorized, updateAllocation);

// Delete an allocation route
router.delete('/:id', isAuthorized, deleteAllocation);

export default router;
