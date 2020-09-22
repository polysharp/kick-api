const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const joi = require('@hapi/joi');

const variantJoiSchema = joi.object({
  productId: joi.string().required(),
  name: joi
    .string()
    .min(1)
    .required(),
  price: joi
    .number()
    .integer()
    .min(1)
    .required()
});

const variantSchema = new mongoose.Schema(joigoose.convert(variantJoiSchema), {
  timestamps: true
});
const Variant = mongoose.model('Variant', variantSchema);

module.exports = {
  variantJoiSchema,
  Variant
};
