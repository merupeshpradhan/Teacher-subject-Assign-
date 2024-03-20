import Subject from "../models/subjectSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsynchError.js";

// Create a new subject
export const createSubject = catchAsyncError(async (req, res, next) => {
  const { name, courseName, subjectShortName, subjectCode } = req.body;

  if (!name || !courseName || !subjectShortName || !subjectCode) {
    return next(
      new ErrorHandler("All fields are required for subject creation", 400)
    );
  }

  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin users can create subjects", 403));
  }
  const subject = await Subject.create({
    name,
    courseName,
    subjectShortName,
    subjectCode,
  });
  res.status(201).json({ success: true, data: subject });
});

// Get all subjects
export const getSubjects = catchAsyncError(async (req, res, next) => {
  const subjects = await Subject.find();
  res
    .status(200)
    .json({ success: true, count: subjects.length, data: subjects });
});

// Get a single subject by ID
export const getSubjectById = catchAsyncError(async (req, res, next) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    return next(
      new ErrorHandler(`Subject not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: subject });
});

// Update a subject by ID
export const updateSubject = catchAsyncError(async (req, res, next) => {
  let subject = await Subject.findById(req.params.id);
  if (!subject) {
    return next(
      new ErrorHandler(`Subject not found with id ${req.params.id}`, 404)
    );
  }
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin users can update subjects", 403));
  }
  subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res
    .status(200)
    .json({ success: true, data: subject, message: "Subject is Updated" });
});

// Delete a subject by ID
export const deleteSubject = catchAsyncError(async (req, res, next) => {
  const subject = await Subject.findOneAndDelete({ _id: req.params.id });
  if (!subject) {
    return next(
      new ErrorHandler(`Subject not found with id ${req.params.id}`, 404)
    );
  }
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin users can delete subjects", 403));
  }
  res
    .status(200)
    .json({ success: true, data: {}, message: "Subject is Deleted" });
});
