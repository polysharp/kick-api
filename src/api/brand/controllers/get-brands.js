const HTTP_CODE = require('http-status-codes');

const { Brand } = require('../models');

const getBrands = async (_, res) => {
  try {
    const brands = await Brand.find();
    if (brands.length < 1) return res.sendStatus(HTTP_CODE.NOT_FOUND);
    return res.set(HTTP_CODE.OK).json(brands);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getBrands;
