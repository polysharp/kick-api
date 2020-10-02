const HTTP_CODE = require('http-status-codes');

const { Category } = require('../models');

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category)
      return res.status(HTTP_CODE.NOT_FOUND).json({
        status: HTTP_CODE.NOT_FOUND,
        msg: 'Category not found',
      });

    return res.status(HTTP_CODE.OK).json(category);
  } catch (err) {
    res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
    return err;
  }
};

module.exports = getCategory;
