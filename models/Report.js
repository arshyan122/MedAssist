const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Report title is required'],
      trim: true,
    },
    doctor: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: ['blood-test', 'x-ray', 'mri', 'ct-scan', 'urine-test', 'ecg', 'general', 'prescription'],
      default: 'general',
    },
    summary: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['normal', 'attention', 'critical'],
      default: 'normal',
    },
    fileUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
