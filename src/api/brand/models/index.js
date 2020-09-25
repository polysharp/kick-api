const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const joi = require('joi');

const brandJoiSchema = joi.object({
  name: joi.string().min(1).required(),
});

const brandSchema = new mongoose.Schema(joigoose.convert(brandJoiSchema), {
  timestamps: true,
});
const Brand = mongoose.model('Brand', brandSchema);

module.exports = {
  brandJoiSchema,
  Brand,
};
