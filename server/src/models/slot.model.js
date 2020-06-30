const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const slotSchema = mongoose.Schema(
  {
    sellerId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    fromTime: {
      type: Date,
      required: true,
    },
    toTime: {
      type: Date,
      required: true,
    },
    isBooked: {
      type: Boolean,
      required: true,
      default: false,
    },
    _createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
slotSchema.plugin(toJSON);
slotSchema.plugin(paginate);

slotSchema.statics.isSlotOverlapping = async function (startDate, endDate, sellerId) {
  const slot = await this.findOne({
    sellerId,
    $or: [
      { $and: [{ fromTime: { $gte: startDate } }, { fromTime: { $lte: endDate } }] },
      { fromTime: { $lte: startDate }, toTime: { $gte: startDate } },
    ],
  });
  return !!slot;
};

slotSchema.statics.isSlotBooked = async function (id) {
  const slot = await this.findById(id);
  return slot ? slot.isBooked : null;
};

slotSchema.statics.isPastSlot = async function (id) {
  const slot = await this.findById(id);
  const slotTime = new Date(slot.fromTime).getTime();
  return Date.now() > slotTime;
};

slotSchema.statics.bookSlot = async function (id) {
  const slot = await this.findById(id);
  Object.assign(slot, { isBooked: true });
  await slot.save();
  return slot;
};

/**
 * @typedef Slot
 */
const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
