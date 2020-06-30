const APPOINTMENT_STATUS_ENUM = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

const appointmentStatusTypes = Object.values(APPOINTMENT_STATUS_ENUM);

module.exports = {
  APPOINTMENT_STATUS_ENUM,
  appointmentStatusTypes,
};
