const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const joi = require('@hapi/joi');

const joiLoginSchema = joi.object({
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .min(8)
    .max(255)
    .required()
});

const joiUserSchema = joi.object({
  username: joi.string().required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .min(8)
    .max(255)
    .required()
});

const userSchema = new mongoose.Schema(joigoose.convert(joiUserSchema), {
  timestamps: true
});
const User = mongoose.model('User', userSchema);

module.exports = {
  joiUserSchema,
  joiLoginSchema,
  User
};
