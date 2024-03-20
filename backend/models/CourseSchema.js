import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
  },
  branch: {
    type: String,
    required: [true, 'Branch name is required'],
  },
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
