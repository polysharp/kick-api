const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const joi = require('@hapi/joi');

const serieJoiSchema = joi.object({
  brandId: joi.string().required(),
  name: joi
    .string()
    .min(1)
    .required(),
  release: joi
    .string()
    .min(1)
    .required()
});

const joigooseSchema = joigoose.convert(serieJoiSchema);

joigooseSchema.name.unique = true;

const serieSchema = new mongoose.Schema(joigooseSchema, {
  timestamps: true
});
const Serie = mongoose.model('Serie', serieSchema);

module.exports = {
  serieJoiSchema,
  Serie
};
