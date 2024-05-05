import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: [true, "Teacher name is required"],
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  role: {
    type: String,
    required: [true, "please Provide your role"],
    enum: ["admin", "teacher"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  subjects: [
    {
      subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject", // Reference to the Subject model
      },
      subject_teaching_experience: {
        type: Number,
        default: 0, // Default teaching experience (if not provided)
      },
      preference: {
        type: Number,
      }
    },
  ],
  teachingExperience: {
    type: Number,
    required: [true, "Teaching Experence is required"],
  },
  teachingHours: {
    type: Number,
  },
});

// Compile the Teacher model
const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
