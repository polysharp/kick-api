const HTTP_CODE = require('http-status-codes');

const { Variant } = require('../models');

const getVariant = async (req, res) => {
  try {
    const variant = await Variant.findOne({
      _id: req.params.id
    });

    if (!variant)
      return res.set(HTTP_CODE.NOT_FOUND).json({
        message: 'Variant not found'
      });

    return res.set(HTTP_CODE.OK).json(variant);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getVariant;
