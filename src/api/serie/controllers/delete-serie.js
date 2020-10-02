const HTTP_CODE = require('http-status-codes');
const mongoose = require('mongoose');

const { Serie } = require('../models');

const deleteSerie = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    const serieExists = await Serie.findById(req.params.id);
    if (!serieExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    return Serie.deleteOne({ _id: req.params.id }, (err, result) => {
      if (err) {
        return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR).json(err);
      }
      return res.set(HTTP_CODE.OK).json(result);
    });
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = deleteSerie;
