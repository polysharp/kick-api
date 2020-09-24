const HTTP_CODE = require('http-status-codes');

const { Product } = require('../models');

const getProducts = async (_, res) => {
  try {
    const products = await Product.find();
    if (products.length < 1) return res.sendStatus(HTTP_CODE.NOT_FOUND);
    return res.set(HTTP_CODE.OK).json(products);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getProducts;
