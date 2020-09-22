const HTTP_CODE = require('http-status-codes');

const { Variant } = require('../models');

const getVariant = async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);
    if (!variant)
      return res.set(HTTP_CODE.NOT_FOUND).json({
        status: HTTP_CODE.NOT_FOUND,
        msg: 'Variant not found'
      });

    return res.set(HTTP_CODE.OK).json(variant);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getVariant;
