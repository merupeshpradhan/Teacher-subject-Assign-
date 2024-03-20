import express from 'express';
import { createSubject, getSubjects, getSubjectById, updateSubject, deleteSubject } from '../controllers/subjectController.js';
import { isAuthorized } from '../middlewares/auth.js';

const router = express.Router();

// Routes for subjects
router.post('/', isAuthorized, createSubject); // Create a new subject
router.get('/', getSubjects); // Get all subjects
router.get('/:id', getSubjectById); // Get a single subject by ID
router.put('/:id', isAuthorized, updateSubject); // Update a subject by ID
router.delete('/:id', isAuthorized, deleteSubject); // Delete a subject by ID

export default router;
