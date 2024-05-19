import Allocation from "../models/allocationSchema.js";
import Teacher from "../models/teacherSchema.js";
import Subject from "../models/subjectSchema.js";
// import { shuffle } from "lodash";
import _ from "lodash";
import { catchAsyncError } from "../middlewares/catchAsynchError.js";

// Allocate a teacher to a subject

export const allocateTeacher = async (req, res, next) => {
  // Check if the user is admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Only admin users can allocate teachers",
    });
  }

  const { subjectId, courseId,semester } = req.body;

  try {
    // Find all teachers who can teach the subject and are not allocated to any subject
    const unallocatedTeachers = await Teacher.find(
      { 
        "subjects.subject": subjectId,
        _id: { $nin: await Allocation.distinct("teacher") } // Filter out teachers already allocated
      }, 
      null, 
      { sort: { "subjects.subject_teaching_experience": -1 } } 
    );

    // Calculate average scores for each unallocated teacher
    const maxPreference = 4;
    const ExpWeight = 10;
    const PreferWeight = 5;

    const scores = unallocatedTeachers
      .map((teacher) => {
        const subjectEntry = teacher.subjects.find(
          (entry) => entry.subject.toString() === subjectId
        );
        if (subjectEntry) {
          const averageScore =
            subjectEntry.subject_teaching_experience * ExpWeight +
            (maxPreference - subjectEntry.preference) * PreferWeight;

          return { teacher, score: averageScore };
        }
        return null; // Return null if subject not found for the teacher
      })
      .filter((score) => score !== null); // Filter out null scores

    // Sort scores in descending order based on average score
    scores.sort((a, b) => b.score - a.score);

    // If there are ties in the highest scores, shuffle the teachers and select one randomly
    let selectedTeacher;
    if (scores.length > 1 && scores[0].score === scores[1].score) {
      const shuffledTeachers = _.shuffle(scores); // Shuffle teachers with tied highest scores
      selectedTeacher = shuffledTeachers[0];
    } else {
      selectedTeacher = scores[0]; // Select the teacher with the highest score
    }

    if (selectedTeacher) {
      // Create the allocation document
      const allocation = new Allocation({
        subject: subjectId,
        course: courseId,
        teacher: selectedTeacher.teacher._id, // Access teacher id from selectedTeacher
        scores: scores,
        semester:semester,
      });

      // Save the allocation to the database
      await allocation.save();

      res.status(201).json({
        success: true,
        message: "Subject Allocated to Teacher successfully",
        data: allocation,
      });
    } else {
      // If no suitable teacher is found
      res.status(404).json({
        success: false,
        message: "No suitable teacher found for the subject",
      });
    }
  } catch (error) {
    next(error);
  }
};


// Update an existing allocation
export const updateAllocation = async (req, res, next) => {
  // Check if the user is admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
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

    res.status(200).json({
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
    return res.status(403).json({
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
  res.status(200).json({
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
export const getAllocatedSubject = catchAsyncError(async (req, res, next) => {
  const { teacherId } = req.query;
  try {
    const teachers = await Allocation.find({
      teacher: teacherId,
    });
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    next(error);
  }
});
