const HTTP_CODE = require('http-status-codes');

const { Category } = require('../models');

const getCategories = async (_, res) => {
  try {
    const categories = await Category.find();
    if (categories.length < 1) return res.sendStatus(HTTP_CODE.NOT_FOUND);
    return res.set(HTTP_CODE.OK).json(categories);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getCategories;
