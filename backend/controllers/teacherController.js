import Teacher from '../models/teacherSchema.js';
import ErrorHandler from '../middlewares/error.js';
import { catchAsyncError } from '../middlewares/catchAsynchError.js';

// Create a new teacher
export const createTeacher = catchAsyncError(async (req, res, next) => {
  const { name, mobile, email, gender, dateOfBirth, subjects, teachingExperience,teachingHours } = req.body;

  // Check if all fields are provided
  if (!name || !mobile || !email || !gender || !dateOfBirth || !subjects || !teachingExperience || !teachingHours) {
    return next(new ErrorHandler('All fields are required to create a teacher', 400));
  }

  // Check if the user is admin
  if (req.user.role !== 'admin') {
    return next(new ErrorHandler('Only admin users can create teachers', 403));
  }

  const teacher = await Teacher.create({ name, mobile, email, gender, dateOfBirth, subjects, teachingExperience,teachingHours });
  res.status(201).json({ success: true, message: 'Teacher created successfully', data: teacher });
});

// Get all teachers
export const getTeachers = catchAsyncError(async (req, res, next) => {
  const teachers = await Teacher.find();
  res.status(200).json({ success: true, count: teachers.length, data: teachers });
});

// Get a single teacher by name
export const getTeacherByName = catchAsyncError(async (req, res, next) => {
  const { name } = req.params;
  const regex = new RegExp(name, 'i'); // 'i' flag for case-insensitive search
  const teachers = await Teacher.find({ name: { $regex: regex } });
  if (!teachers || teachers.length === 0) {
    return next(new ErrorHandler(`No teacher found with name containing '${name}'`, 404));
  }
  res.status(200).json({ success: true, data: teachers });
});

// Get a single teacher by ID
export const getTeacherById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    return next(new ErrorHandler(`Teacher not found with id ${id}`, 404));
  }
  res.status(200).json({ success: true, data: teacher });
});

// Update a teacher by ID
export const updateTeacher = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, mobile, email, gender, dateOfBirth, subjects, teachingExperience,teachingHours } = req.body;

  // Check if all fields are provided
  if (!name || !mobile || !email || !gender || !dateOfBirth || !subjects || !teachingExperience || !teachingHours) {
    return next(new ErrorHandler('All fields are required to update a teacher', 400));
  }

  // Check if the user is admin
  if (req.user.role !== 'admin') {
    return next(new ErrorHandler('Only admin users can update teachers', 403));
  }

  const teacher = await Teacher.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, message: 'Teacher updated successfully', data: teacher });
});

// Delete a teacher by ID

export const deleteTeacher = catchAsyncError(async (req, res, next) => {
  const teacher = await Teacher.findOneAndDelete({ _id: req.params.id });
  if (!teacher) {
    return next(
      new ErrorHandler(`Teacher not found with id ${req.params.id}`, 404)
    );
  }
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin users can delete Teacher data", 403));
  }
  res
    .status(200)
    .json({ success: true, data: {}, message: "Teacher Data is Deleted" });
});