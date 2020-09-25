const HTTP_CODE = require('http-status-codes');

const { Variant, variantJoiSchema } = require('../models');

const createVariant = async (req, res) => {
  try {
    const { error } = variantJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map((detail) => detail.message),
        error,
      });

    const variant = new Variant({
      productId: req.body.productId,
      ref: req.body.ref,
      color: req.body.color,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    variant.save((err) => {
      if (err)
        if (Object.keys(err.keyValue)[0] === 'ref')
          return res.status(HTTP_CODE.CONFLICT).json({
            status: HTTP_CODE.CONFLICT,
            msg: `Variant with ref (${req.body.ref}) for Product with id (${req.body.productId}) already exists.`,
          });
        else
          return res.status(HTTP_CODE.CONFLICT).json({
            status: HTTP_CODE.CONFLICT,
            msg: `Variant with color (${req.body.color.code}) for Product with id (${req.body.productId}) already exists.`,
          });
      return res.set(HTTP_CODE.OK).json(variant);
    });

    return null;
  } catch (err) {
    return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createVariant;
