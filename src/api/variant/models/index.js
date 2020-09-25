const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const joi = require('joi');

const variantJoiSchema = joi.object({
  productId: joi.string().required(),
  ref: joi.string(),
  color: joi
    .object({
      label: joi.string().min(1).required(),
      code: joi
        .string()
        .regex(/^#[a-fA-F0-9]{6}$/)
        .required(),
    })
    .required(),
  price: joi.number().integer().min(1).required(),
  quantity: joi.number().min(0).required(),
});

const joigooseSchema = joigoose.convert(variantJoiSchema);

joigooseSchema.ref.unique = true;
joigooseSchema.color.code.unique = true;

const variantSchema = new mongoose.Schema(joigooseSchema, {
  timestamps: true,
});

const Variant = mongoose.model('Variant', variantSchema);

module.exports = {
  variantJoiSchema,
  Variant,
};
