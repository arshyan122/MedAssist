const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getAppointments, createAppointment, cancelAppointment } = require('../controllers/appointmentController');

router.route('/').get(protect, getAppointments).post(protect, createAppointment);
router.route('/:id/cancel').patch(protect, cancelAppointment);

module.exports = router;
