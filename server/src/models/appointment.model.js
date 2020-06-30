const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { ROLES_ENUM } = require('./../config/roles');
const { appointmentStatusTypes, APPOINTMENT_STATUS_ENUM } = require('./../config/appointment');

const appointmentSchema = mongoose.Schema(
  {
    buyerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    slotId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Slot',
      required: true,
    },
    _createdOn: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: appointmentStatusTypes,
      default: APPOINTMENT_STATUS_ENUM.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(paginate);

appointmentSchema.statics.appointmentExists = async function (filter) {
  const appointment = await this.find(filter).sort({ _id: -1 });
  const exists =
    appointment.length > 0 ? (appointment[0].status === APPOINTMENT_STATUS_ENUM.REJECTED ? false : true) : false;
  return exists;
};

appointmentSchema.statics.isAppointmentInPast = async function (id) {
  const { slotId: { fromTime } = {} } = await this.findById(id).populate('slotId');
  const fromAppointmentMs = new Date(fromTime).getTime();
  return Date.now() > fromAppointmentMs;
};

/**
 * @typedef Appointment
 */
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
