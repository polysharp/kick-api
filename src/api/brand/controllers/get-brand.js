const HTTP_CODE = require('http-status-codes');

const { Brand } = require('../models');
const { Serie } = require('../../serie/models');

const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand)
      return res.status(HTTP_CODE.NOT_FOUND).json({
        status: HTTP_CODE.NOT_FOUND,
        msg: 'Brand not found',
      });

    const series = await Serie.find({ brandId: req.params.id });

    return res.status(HTTP_CODE.OK).json({ brand, series });
  } catch (err) {
    res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
    return err;
  }
};

module.exports = getBrand;
