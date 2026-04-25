const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, 'Dosage is required'],
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    frequency: {
      type: String,
      enum: ['daily', 'twice-daily', 'weekly', 'monthly', 'as-needed'],
      default: 'daily',
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
      default: '',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Medicine', medicineSchema);
