const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.0,
    },
    image: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    hospital: {
      type: String,
      default: '',
    },
    consultFee: {
      type: Number,
      default: 500,
    },
    experience: {
      type: Number,
      default: 5,
    },
    available: {
      type: Boolean,
      default: true,
    },
    availableSlots: {
      type: [String],
      default: ['10:00 AM', '2:00 PM', '4:00 PM'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
