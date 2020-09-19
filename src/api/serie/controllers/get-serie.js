const HTTP_CODE = require('http-status-codes');

const { Serie } = require('../models');

const getSerie = async (req, res) => {
  try {
    const serie = await Serie.findOne({
      _id: req.params.id
    });

    if (!serie)
      return res.set(HTTP_CODE.NOT_FOUND).json({
        message: 'Serie not found'
      });

    return res.set(HTTP_CODE.OK).json(serie);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getSerie;
