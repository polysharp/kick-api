const HTTP_CODE = require('http-status-codes');

const { Variant, variantJoiSchema } = require('../models');

const createVariant = async (req, res) => {
  try {
    const { error } = variantJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map(detail => detail.message),
        error
      });

    const variantExists = await Variant.find({ productId: req.body.productId });
    if (variantExists)
      variantExists.forEach(variant => {
        if (variant.name === req.body.name)
          return res.status(HTTP_CODE.CONFLICT).json({
            status: HTTP_CODE.CONFLICT,
            msg: `Variant with name (${req.body.name}) for Product with id (${req.body.brandId}) already exists.`
          });
        return null;
      });

    const variant = new Variant({
      productId: req.body.productId,
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
