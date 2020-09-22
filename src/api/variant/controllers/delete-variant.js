const HTTP_CODE = require('http-status-codes');
const mongoose = require('mongoose');

const { Variant } = require('../models');

const deleteVariant = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    const variantExists = await Variant.findById(req.params.id);
    if (!variantExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    return Variant.deleteOne({ _id: req.params.id }, (err, result) => {
      if (err) {
        return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR).json(err);
      }
      return res.set(HTTP_CODE.OK).json(result);
    });
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = deleteVariant;
