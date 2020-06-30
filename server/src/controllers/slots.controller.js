const httpStatus = require('http-status');
const { pick } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { slotService } = require('../services');

const createSlot = catchAsync(async (req, res) => {
  const slot = await slotService.createSlot(req.body);
  res.status(httpStatus.CREATED).send(slot);
});

const getSlots = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['sellerId', 'isBooked']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await slotService.querySlots(filter, options);
  res.send(result);
});

const getSlotsBetweenDate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['sellerId', 'fromDate', 'toDate', 'isBooked']);
  const result = await slotService.querySlotsBetweenDate(filter);
  res.send(result);
});


module.exports = {
  createSlot,
  getSlots,
  getSlotsBetweenDate,
};
