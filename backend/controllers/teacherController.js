import Teacher from "../models/teacherSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsynchError.js";

// Create a new teacher
export const createTeacher = catchAsyncError(async (req, res, next) => {
  const {
    name,
    role,
    mobile,
    email,
    gender,
    dateOfBirth,
    teachingExperience,
  } = req.body;

  // Check if all required fields are provided
  if (
    !name ||
    !role ||
    !mobile ||
    !email ||
    !gender ||
    !dateOfBirth ||
    !teachingExperience 
  ) {
    return next(
      new ErrorHandler("All fields are required to create a teacher", 400)
    );
  }

  const isEmial = await Teacher.findOne({ email });
  if (isEmial) {
    return next(new ErrorHandler("Email already exists!"));
  }

  // Check if the user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin users can create teachers", 403));
  }

  const teacher = await Teacher.create({
    name,
    role,
    mobile,
    email,
    gender,
    dateOfBirth,
    teachingExperience,
  });

  res.status(201).json({
    success: true,
    message: "Teacher added successfully",
    data: teacher,
  });
});

// Get all teachers
export const getTeachers = catchAsyncError(async (req, res, next) => {
  const teachers = await Teacher.find();
  res
    .status(200)
    .json({ success: true, count: teachers.length, data: teachers });
});

// Get a single teacher by name
export const getTeacherByName = catchAsyncError(async (req, res, next) => {
  const { name } = req.params;
  const regex = new RegExp(name, "i"); // 'i' flag for case-insensitive search
  const teachers = await Teacher.find({ name: { $regex: regex } });

  if (!teachers || teachers.length === 0) {
    return next(
      new ErrorHandler(`No teacher found with name containing '${name}'`, 404)
    );
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

// Get a single teacher Detials email
export const getTeacherByEmail = catchAsyncError(async (req, res, next) => {
  const { email } = req.params;
  // console.log(email);
  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    return next(new ErrorHandler(`Teacher not found with id ${id}`, 404));
  }

  res.status(200).json({ success: true, data: teacher });
});

// Update a teacher by ID
export const updateTeacher = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    mobile,
    email,
    gender,
    dateOfBirth,
    subjects,
    teachingExperience,
    teachingHours,
  } = req.body;

  // Check if all required fields are provided
  if (
    !name ||
    !mobile ||
    !email ||
    !gender ||
    !dateOfBirth ||
    !teachingExperience ||
    !teachingHours
  ) {
    return next(
      new ErrorHandler("All fields are required to update a teacher", 400)
    );
  }

  // Check if the user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin users can update teachers", 403));
  }

  // Prepare the subjects array with optional fields handling
  // const formattedSubjects = subjects.map((subject) => ({
  //   type: subject.type,
  //   subject_teaching_experience: subject.subject_teaching_experience || 0,
  //   preference: subject.preference || "",
  // }));

  const updatedTeacher = await Teacher.findByIdAndUpdate(
    id,
    {
      name,
      mobile,
      email,
      gender,
      dateOfBirth,
      teachingExperience,
      teachingHours,
    },
    { new: true, runValidators: true }
  );

  if (!updatedTeacher) {
    return next(new ErrorHandler(`Teacher not found with id ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: "Teacher updated successfully",
    data: updatedTeacher,
  });
});

// Delete a teacher by ID
export const deleteTeacher = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin users can delete teachers", 403));
  }
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    return next(new ErrorHandler(`Teacher not found with id ${id}`, 404));
  }

  await teacher.deleteOne();

  res
    .status(200)
    .json({ success: true, message: "Teacher deleted successfully", data: {} });
});

export const addSubjectToTeacher = catchAsyncError(async (req, res, next) => {
  const { subjectId, subjectTeachingExperience, preference } = req.body;
  const { email } = req.params;

  // Find the teacher by email
  const teacher = await Teacher.findOne({ email });
  // console.log(subjectId, teachingExperience, preference,email);

  if (!teacher) {
    return next(new ErrorHandler(`Teacher not found with email ${email}`, 404));
  }

  if (!subjectId || !subjectTeachingExperience || !preference) {
    return next(
      new ErrorHandler("All fields are required to adding subject", 400)
    );
  }

  // Check if the teacher's subject count is already 5
  if (teacher.subjects.length >= 3) {
    return next(
      new ErrorHandler(`Teacher already has the maximum of 3 subjects`, 400)
    );
  }

  // Create a new subject object
  const newSubject = {
    subject: subjectId,
    subject_teaching_experience: subjectTeachingExperience || 0,
    preference,
  };

  // Add the new subject to the teacher's subjects array
  teacher.subjects.push(newSubject);

  // Save the updated teacher document
  await teacher.save();

  res
    .status(201)
    .json({
      success: true,
      message: "Subject added to teacher successfully",
      data: teacher,
    });
});

export const updateSubject = catchAsyncError(async (req, res, next) => {
  const { teacherId, subjectId } = req.params;
  const { teachingExperience, preference } = req.body;

  try {
    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find the subject within the teacher's subjects array by ID
    const subject = teacher.subjects.find(
      (sub) => sub._id.toString() === subjectId
    );

    if (!subject) {
      return res
        .status(404)
        .json({ message: "Subject not found for this teacher" });
    }

    // Update the subject details
    subject.subject_teaching_experience = teachingExperience;
    subject.preference = preference;

    // Save the updated teacher object
    await teacher.save();

    res.status(200).json({ message: "Subject details updated successfully" });
  } catch (error) {
    console.error("Error updating subject details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const deleteSubject = catchAsyncError(async (req, res, next) => {
  const { teacherId, subjectId } = req.params;

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    return next(new ErrorHandler(`Teacher not found with id ${teacherId}`, 404));
  }

  // Filter out the subject by subjectId
  teacher.subjects = teacher.subjects.filter(sub => sub._id.toString() !== subjectId);

  // Save the updated teacher document
  await teacher.save();

  res.status(200).json({ message: 'Subject deleted from teacher successfully' });
});

export default {
  createTeacher,
  getTeachers,
  getTeacherByName,
  getTeacherById,
  getTeacherByEmail,
  updateTeacher,
  deleteTeacher,
  addSubjectToTeacher,
  updateSubject,
  deleteSubject,
};
