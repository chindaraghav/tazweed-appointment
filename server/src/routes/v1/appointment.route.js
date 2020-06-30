const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const appointmentValidation = require('../../validations/appointment.validation');
const appointmentController = require('../../controllers/appointment.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createAppointment'), validate(appointmentValidation.create), appointmentController.createAppointment)
  .get(auth('getAppointment'), validate(appointmentValidation.get), appointmentController.getAppointment);

router
  .route('/accept')
  .patch(auth('acceptAppointment'), validate(appointmentValidation.accept), appointmentController.acceptAppointment);

router
  .route('/reject')
  .patch(auth('rejectAppointment'), validate(appointmentValidation.reject), appointmentController.rejectAppointment);

router
  .get('/confirmed')
  .patch(
    auth('getAppointment'),
    validate(appointmentValidation.getConfirmed),
    appointmentController.getConfirmedAppointments
  );

module.exports = router;
