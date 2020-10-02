const HTTP_CODE = require('http-status-codes');

const { Serie } = require('../models');

const getSerie = async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);

    if (!serie)
      return res.set(HTTP_CODE.NOT_FOUND).json({
        status: HTTP_CODE.NOT_FOUND,
        msg: 'Serie not found',
      });

    return res.set(HTTP_CODE.OK).json(serie);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getSerie;
