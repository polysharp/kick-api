const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const joi = require('@hapi/joi');

const categoryJoiSchema = joi.object({
  name: joi
    .string()
    .min(1)
    .required()
});

const joigooseSchema = joigoose.convert(categoryJoiSchema);

joigooseSchema.name.unique = true;

const categorySchema = new mongoose.Schema(joigooseSchema, {
  timestamps: true
});
const Category = mongoose.model('Category', categorySchema);

module.exports = {
  categoryJoiSchema,
  Category
};
