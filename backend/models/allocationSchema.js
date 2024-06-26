import mongoose from 'mongoose';

const allocationSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Subject is required'],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required'],
  },
  timing: {
    type: String,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Teacher is required'],
  },
  scores: [
    {
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
  semester:{
    type:String,
  }
});

const Allocation = mongoose.model('Allocation', allocationSchema);

export default Allocation;
