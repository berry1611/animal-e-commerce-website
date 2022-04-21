const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number().integer().required(),
  dateOfBirth: Joi.date().iso().optional(),
  price: Joi.number().precision(2).optional(),
  gender: Joi.any().valid('male', 'female').optional(),
  weight: Joi.string().optional(),
  height: Joi.string().optional(),
  description: Joi.string().optional(),
  title: Joi.string().optional(),
  raceId: Joi.number().integer().optional(),
  animalId: Joi.number().integer().optional(),
})

module.exports = schema