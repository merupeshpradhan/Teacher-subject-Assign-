import Course from '../models/courseSchema.js';
import ErrorHandler from '../middlewares/error.js';
import { catchAsyncError } from '../middlewares/catchAsynchError.js';

// Create a new course
export const createCourse = catchAsyncError(async (req, res, next) => {
  const { name, branch } = req.body;

  // Check if all fields are provided
  if (!name || !branch) {
    return next(new ErrorHandler('Course name and branch are required', 400));
  }

  // Check if the user is admin
  if (req.user.role !== 'admin') {
    return next(new ErrorHandler('Only admin users can create courses', 403));
  }

  const course = await Course.create({ name, branch });
  res.status(201).json({ success: true, message: 'Course created successfully', data: course });
});

// Update an existing course
export const updateCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, branch } = req.body;

  // Check if all fields are provided
  if (!name || !branch) {
    return next(new ErrorHandler('Course name and branch are required', 400));
  }

  // Check if the user is admin
  if (req.user.role !== 'admin') {
    return next(new ErrorHandler('Only admin users can update courses', 403));
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, { name, branch }, { new: true });
  if (!updatedCourse) {
    return next(new ErrorHandler('Course not found', 404));
  }

  res.status(200).json({ success: true, message: 'Course updated successfully', data: updatedCourse });
});

// Delete an existing course
export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Check if the user is admin
  if (req.user.role !== 'admin') {
    return next(new ErrorHandler('Only admin users can delete courses', 403));
  }

  const deletedCourse = await Course.findByIdAndDelete(id);
  if (!deletedCourse) {
    return next(new ErrorHandler('Course not found', 404));
  }

  res.status(200).json({ success: true, message: 'Course deleted successfully', data: {} });
});

// Search for courses by name
export const searchCourseByName = catchAsyncError(async (req, res, next) => {
  const { name } = req.params;
  const regex = new RegExp(name, 'i'); // 'i' flag for case-insensitive search
  const courses = await Course.find({ name: { $regex: regex } });
  if (!courses || courses.length === 0) {
    return next(new ErrorHandler(`No course found with name containing '${name}'`, 404));
  }
  res.status(200).json({ success: true, data: courses });
});

// Get all courses
export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find();
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// Get Course by ID
export const getCourseById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorHandler(`Teacher not found with id ${id}`, 404));
  }
  res.status(200).json({ success: true, data: course });
});
