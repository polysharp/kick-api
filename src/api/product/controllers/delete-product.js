const HTTP_CODE = require('http-status-codes');
const mongoose = require('mongoose');

const { Product } = require('../models');

const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    const productExists = await Product.findById(req.params.id);
    if (!productExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    return Product.deleteOne({ _id: req.params.id }, (err, result) => {
      if (err) {
        return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json(err);
      }
      return res.status(HTTP_CODE.OK).json(result);
    });
  } catch (err) {
    return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = deleteProduct;
