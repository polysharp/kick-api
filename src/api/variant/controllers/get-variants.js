const HTTP_CODE = require('http-status-codes');

const { Variant } = require('../models');

const getVariants = async (req, res) => {
  try {
    const variants = await Variant.find();
    if (variants.length < 1) return res.sendStatus(HTTP_CODE.NOT_FOUND);
    return res.set(HTTP_CODE.OK).json(variants);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getVariants;
