const HTTP_CODE = require('http-status-codes');

const { Product } = require('../models');
const { Serie } = require('../../serie/models');

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(HTTP_CODE.NOT_FOUND).json({
        status: HTTP_CODE.NOT_FOUND,
        msg: 'Product not found'
      });

    const series = await Serie.find({ productId: req.params.id });

    return res.status(HTTP_CODE.OK).json({ product, series });
  } catch (err) {
    res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
    return err;
  }
};

module.exports = getProduct;
