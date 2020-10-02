const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const joi = require('joi');

const productJoiSchema = joi.object({
  ref: joi.string().required(),
  name: joi.string().min(1).required(),
  description: joi.string().min(1).required(),
  category: joi.string().required(),
  brand: joi.string().required(),
  serie: joi.string().required(),
  rate: joi
    .object({
      score: joi.number().min(0).max(5).default(0).required(),
      amount: joi.number().min(0).default(0).required(),
    })
    .required(),
});

const joigooseSchema = joigoose.convert(productJoiSchema);

joigooseSchema.ref.unique = true;

const productSchema = new mongoose.Schema(joigooseSchema, {
  timestamps: true,
});
const Product = mongoose.model('Product', productSchema);

module.exports = {
  productJoiSchema,
  Product,
};
