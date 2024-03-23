import express from 'express';
import { allocateTeacher, updateAllocation, deleteAllocation,getAllocatedTeacher } from '../controllers/allocationControllers.js';
import { isAuthorized } from '../middlewares/auth.js'; // Import the authorization middleware

const router = express.Router();

// Allocate a teacher route
router.post('/allocate', isAuthorized, allocateTeacher);

router.get('/allocatedTeacher', isAuthorized, getAllocatedTeacher);

// Update an allocation route
router.put('/update/:id', isAuthorized, updateAllocation);

// Delete an allocation route
router.delete('/delete/:id', isAuthorized, deleteAllocation);

export default router;
