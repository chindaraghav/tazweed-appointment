const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const slotValidation = require('../../validations/slots.validation');
const slotsController = require('../../controllers/slots.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createSlot'), validate(slotValidation.createSlot), slotsController.createSlot)
  .get(auth('getSlots'), validate(slotValidation.getSlots), slotsController.getSlotsBetweenDate);

module.exports = router;
