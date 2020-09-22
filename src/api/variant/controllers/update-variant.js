const HTTP_CODE = require('http-status-codes');

const { Variant, variantJoiSchema } = require('../models');

const updateVariant = async (req, res) => {
  try {
    const { error } = variantJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map(detail => detail.message),
        error
      });

    const variantExists = await Variant.findById(req.params.id);
    if (!variantExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    await Variant.findByIdAndUpdate(req.params.id, {
      productId: req.body.productId,
      name: req.body.name,
      price: req.body.price
    });

    const updatedVariant = await Variant.findById(req.params.id);

    return res.set(HTTP_CODE.OK).json(updatedVariant);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = updateVariant;
