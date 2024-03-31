import Allocation from "../models/allocationSchema.js";
import Teacher from "../models/teacherSchema.js";
import Subject from "../models/subjectSchema.js";
import { catchAsyncError } from "../middlewares/catchAsynchError.js";

// Allocate a teacher to a subject
export const allocateTeacher = async (req, res, next) => {
  // Check if the user is admin
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        success: false,
        message: "Only admin users can allocate teachers",
      });
  }

  const { subjectId, courseId } = req.body;

  try {
    // Find all teachers who can teach the subject
    const teachers = await Teacher.find({ subjects: subjectId }).sort({
      teachingExperience: -1,
      teachingHours: 1,
    });

    // Select the most suitable teacher for allocation
    const teacher = teachers[0];

    // Create the allocation document
    const allocation = new Allocation({
      subject: subjectId,
      course: courseId,
      teacher: teacher._id,
    });

    // Save the allocation to the database
    await allocation.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Subject Allocated to Teacher successfully",
        data: allocation,
      });
  } catch (error) {
    next(error);
  }
};

// Update an existing allocation
export const updateAllocation = async (req, res, next) => {
  // Check if the user is admin
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        success: false,
        message: "Only admin users can update allocations",
      });
  }

  const { id } = req.params;
  const { timing, teacher } = req.body;
  try {
    // Update allocation with new timing and teacher
    const updatedAllocation = await Allocation.findByIdAndUpdate(
      id,
      { timing, teacher: teacher },
      { new: true }
    );
    if (!updatedAllocation) {
      return res
        .status(404)
        .json({ success: false, message: "Allocation not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Allocation updated successfully",
        data: updatedAllocation,
      });
  } catch (error) {
    next(error);
  }
};
// Delete an existing allocation
export const deleteAllocation = async (req, res, next) => {
  // Check if the user is admin
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        success: false,
        message: "Only admin users can delete allocations",
      });
  }

  const { id } = req.params;

  try {
    const deletedAllocation = await Allocation.findByIdAndDelete(id);
    if (!deletedAllocation) {
      return res
        .status(404)
        .json({ success: false, message: "Allocation not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Allocation deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all Allocatated Teacher in Subject
export const getAllocatedTeacher = catchAsyncError(async (req, res, next) => {
  const subjectAllocated = await Allocation.find();
  res
    .status(200)
    .json({
      success: true,
      count: subjectAllocated.length,
      data: subjectAllocated,
    });
});

// Get teachers for a subject with same experience and teaching hours
export const getTeachersForSubject = catchAsyncError(async (req, res, next) => {
  const { subjectId, teachingExperience, teachingHours } = req.query;
  try {
    const teachers = await Teacher.find({
      subjects: subjectId,
      teachingExperience: teachingExperience,
      teachingHours: teachingHours,
    });
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    next(error);
  }
});
