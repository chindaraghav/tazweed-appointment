const httpStatus = require('http-status');
const { Slot } = require('../models');
const ApiError = require('../utils/ApiError');
const { getSlotRange } = require('../utils/date');

/**
 * Create a slot
 * @param {Object} slotBody
 * @returns {Promise<Slot>}
 */
const createSlot = async (slotBody) => {
  const { fromTime = '', toTime = '', sellerId = '', duration } = slotBody;
  if (new Date(fromTime).getTime() < Date.now()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot create slots in past!');
  }
  if (await Slot.isSlotOverlapping(fromTime, toTime, sellerId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Selected slot is overllaping another slot');
  }
  const slotRange = getSlotRange(fromTime, duration, toTime).map((slot) => ({ ...slot, sellerId }));
  const slots = await Slot.insertMany(slotRange);
  return slots;
};

/**
 * Query for slots
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySlots = async (filter, options) => {
  const slots = await Slot.paginate(filter, options);
  return slots;
};

/**
 * Query for slots
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */

const querySlotsBetweenDate = async (filter) => {
  const { sellerId, fromDate, toDate, ...restFilter } = filter;
  const slots = await Slot.find({ sellerId, fromTime: { $gte: fromDate, $lt: toDate }, ...restFilter });
  return slots;
};

/**
 * Query for slots
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */

/**
 * Get slot by id
 * @param {ObjectId} id
 * @returns {Promise<Slot>}
 */
const getSlotById = async (id) => {
  return Slot.findById(id);
};

/**
 * Delete slot by id
 * @param {ObjectId} slotId
 * @returns {Promise<Slot>}
 */
const deleteSlotById = async (slotId) => {
  const slot = await getSlotById(slotId);
  if (!slot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Slot not found');
  }
  await slot.remove();
  return slot;
};

const bookSlot = async (slotId) => {
  const slot = await Slot.bookSlot(slotId);
  return slot;
};

module.exports = {
  createSlot,
  querySlots,
  getSlotById,
  deleteSlotById,
  querySlotsBetweenDate,
  bookSlot,
};
