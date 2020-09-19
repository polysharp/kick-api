const HTTP_CODE = require('http-status-codes');

const { Variant, variantUpdateJoiSchema } = require('../models');

const updateVariant = async (req, res) => {
  try {
    const { error } = variantUpdateJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        error
      });

    const variantExists = await Variant.findOne({
      _id: req.params.id
    });
    if (!variantExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    await Variant.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price
    });

    const updatedVariant = await Variant.findOne({
      _id: req.params.id
    });

    return res.set(HTTP_CODE.OK).json(updatedVariant);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = updateVariant;
