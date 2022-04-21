import Joi from 'joi'
import { passwordRegex } from '../constants/regex'

const regSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
  name: Joi.string().min(3),
})

const changePassSchema = Joi.object({
  email: Joi.string().email().required(),
  oldPass: Joi.string().required(),
  newPass: Joi.string().pattern(new RegExp(passwordRegex)).required(),
})

const resetPassSchema = Joi.object({
  newPass: Joi.string().pattern(new RegExp(passwordRegex)).required(),
})

module.exports = {
  regSchema,
  changePassSchema,
  resetPassSchema,
}
