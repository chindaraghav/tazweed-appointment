const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    sellerId: Joi.string().custom(objectId).required(),
    buyerId: Joi.string().custom(objectId).required(),
    slotId: Joi.string().custom(objectId).required(),
  }),
};

const get = {
  query: Joi.object().keys({
    sellerId: Joi.string().custom(objectId),
    buyerId: Joi.string().custom(objectId),
    fromDate: Joi.date(),
    toDate: Joi.date(),
    _createdOn: Joi.date(),
    slotId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const accept = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const reject = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const getConfirmed = {
  params: Joi.object().keys({
    sellerId: Joi.string().custom(objectId),
    buyerId: Joi.string().custom(objectId),
    fromTime: Joi.date(),
    toTime: Joi.date(),
  }),
};

module.exports = {
  create,
  get,
  accept,
  reject,
  getConfirmed,
};
