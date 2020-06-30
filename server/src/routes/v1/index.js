const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const appointmentRoute = require('./appointment.route');
const slotRoute = require('./slots.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/appointments', appointmentRoute);
router.use('/slots', slotRoute);

module.exports = router;
