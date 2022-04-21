const Joi = require("joi");

const schema = Joi.object({
  price: Joi.number().precision(2).optional(),
  gender: Joi.any().valid('male', 'female').optional(),
  weight: Joi.string().optional(),
  height: Joi.string().optional(),
  dateOfBirth: Joi.date().iso().optional(),
  description: Joi.string().optional(),
  title: Joi.string().optional(),
  raceId: Joi.number().integer().required(),
  animalId: Joi.number().integer().optional(),
})

module.exports = schema