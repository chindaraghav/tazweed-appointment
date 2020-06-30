const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { pick, get } = require('lodash');
const { appointmentService } = require('../services');
const { APPOINTMENT_STATUS_ENUM } = require('../config/appointment');

const createAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.createAppointment(req.body);
  res.status(httpStatus.CREATED).send({ appointment });
});

const getAppointment = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['sellerId', 'buyerId', 'slotId', 'fromDate', 'toDate']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  let result;

  if (filter.fromDate && filter.toDate) {
    result = await appointmentService.getAppointmentByDateRange(filter);
  } else {
    result = await appointmentService.queryAppointments(filter, options);
  }

  res.send(result);
});

const acceptAppointment = catchAsync(async (req, res) => {
  const appointmentId = get(req.body, 'id', '');
  const updatedAppointment = await appointmentService.acceptAppointment(appointmentId);
  res.send(updatedAppointment);
});

const rejectAppointment = catchAsync(async (req, res) => {
  const id = get(req.body, 'id');
  const result = await appointmentService.updateAppointmentById(id, { status: APPOINTMENT_STATUS_ENUM.REJECTED });
  // send notification
  res.send(result);
});

const getConfirmedAppointments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['sellerId', 'buyerId', 'fromDate', 'toDate']);
  const result = await appointmentService.getConfirmedAppointments(filter);
  // send notification
  res.send(result);
});

module.exports = {
  createAppointment,
  getAppointment,
  acceptAppointment,
  rejectAppointment,
  getConfirmedAppointments,
};
