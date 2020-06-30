const httpStatus = require('http-status');
const slotService = require('./slot.service');
const Appointment = require('../models/appointment.model');
const Slot = require('../models/slot.model');
const ApiError = require('../utils/ApiError');
const { APPOINTMENT_STATUS_ENUM } = require('../config/appointment');

/**
 * Create an appointment
 * @param {Object} appointmentBody
 * @returns {Promise<Appointment>}
 */
const createAppointment = async (appointmentBody) => {
  const { slotId } = appointmentBody;
  if (await Appointment.appointmentExists(appointmentBody)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Appointment already exists');
  }
  if (await Slot.isPastSlot(slotId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot Book past slots!');
  }
  const isSlotBooked = await Slot.isSlotBooked(appointmentBody.slotId);
  if (isSlotBooked === null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot does not exist');
  } else if (isSlotBooked) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot already booked');
  }
  const appointment = await Appointment.create(appointmentBody);
  return appointment;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Appointment>}
 */
const getAppointmentById = async (id) => {
  return Appointment.findById(id);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAppointments = async (filter, options) => {
  const appointments = await Appointment.paginate(filter, options);
  return appointments;
};

const updateAppointmentById = async (id, updateBody) => {
  const appointment = await getAppointmentById(id);
  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  }
  Object.assign(appointment, updateBody);
  await appointment.save();
  return appointment;
};

const rejectManyAppointmentsExcept = async (acceptedBuyerId, forSlotId) => {
  let user = await Appointment.updateMany(
    { $and: [{ slotId: forSlotId }, { buyerId: { $ne: acceptedBuyerId } }] },
    { $set: { status: APPOINTMENT_STATUS_ENUM.REJECTED } }
  );
};

const queryAppointmentsWithPopulatedBuyers = async (filter) => {
  const appointments = await Appointment.find(filter).populate('buyerId');
  return appointments;
};

const getAppointmentByDateRange = async (filter) => {
  const { sellerId, fromDate, toDate } = filter;
  const slotFilter = { sellerId, fromDate, toDate, isBooked: false };
  let slots = await slotService.querySlotsBetweenDate(slotFilter);
  let slotIds = slots.map(({ id }) => id);
  const appointmentFilter = { slotId: { $in: slotIds }, status: APPOINTMENT_STATUS_ENUM.PENDING };
  const appointments = await Appointment.find(appointmentFilter).populate('buyerId').populate('slotId');
  return appointments;
};

const acceptAppointment = async (appointmentId) => {
  if (await Appointment.isAppointmentInPast(appointmentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot accept past slot appointments!');
  }

  const updatedAcceptedAppointment = await updateAppointmentById(appointmentId, {
    status: APPOINTMENT_STATUS_ENUM.ACCEPTED,
  });

  const { slotId, buyerId: acceptedBuyerId } = updatedAcceptedAppointment;
  // let pendingAppointments = await appointmentService.queryAppointmentsWithPopulatedBuyers({
  //   slotId,
  //   status: APPOINTMENT_STATUS_ENUM.PENDING,
  // });

  await rejectManyAppointmentsExcept(acceptedBuyerId, slotId);

  await slotService.bookSlot(slotId);
  // let { fcmToken: acceptedBuyerFcmToken } = await userService.getUserById(acceptedBuyerId);

  // const rejectedBuyerFcmTokens = pendingAppointments.map(({ buyerId = {} }) => buyerId.fcmToken);
  // send notification here buyerFcmTokens/rejectedBuyerFcmTokens
  return updatedAcceptedAppointment;
};

const getConfirmedAppointments = async (filter) => {
  const appointments = await Appointment.countDocuments(filter);
  return appointments;
};

module.exports = {
  createAppointment,
  queryAppointments,
  updateAppointmentById,
  rejectManyAppointmentsExcept,
  queryAppointmentsWithPopulatedBuyers,
  getAppointmentByDateRange,
  acceptAppointment,
  getConfirmedAppointments,
};
