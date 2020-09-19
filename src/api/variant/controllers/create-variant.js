const HTTP_CODE = require('http-status-codes');

const { Variant, variantJoiSchema } = require('../models');

const createVariant = async (req, res) => {
  try {
    const { error } = variantJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        error
      });

    const variantExists = await Variant.findOne({
      belongId: req.body.belongId
    });

    if (variantExists)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        message: 'Variant for this product already exists.'
      });

    const variant = new Variant({
      belongId: req.body.belongId,
      name: req.body.name,
      price: req.body.price
    });

    variant.save();

    return res.set(HTTP_CODE.OK).json(variant);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createVariant;
