import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Provide Subject Full Name"],
    unique: true,
  },
  courseName: {
    type: String,
    required: [true, "please Provide course Detials"],
    // enum: ["MCA", "MSC"],
  },
  subjectShortName: {
    type: String,
    required: [true, "please Provide Subject Short Name"],
  },
  subjectCode: {
    type: String,
    required: [true, "please Provide Subject Code"],
    unique: true,
  }
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;
