import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Teacher name is required'],
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  subjects: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    }],
    required: [true, 'At least one subject is required'],
  },
  teachingExperience: {
    type: Number,
    required: [true, 'Teaching experience is required'],
  },
  teachingHours: {
    type: Number,
    required: [true, 'Teaching hours is required'],
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
