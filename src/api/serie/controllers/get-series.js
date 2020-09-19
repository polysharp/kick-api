const HTTP_CODE = require('http-status-codes');

const { Serie } = require('../models');

const getSeries = async (_, res) => {
  try {
    const series = await Serie.find();
    if (series.length < 1) return res.sendStatus(HTTP_CODE.NOT_FOUND);
    return res.set(HTTP_CODE.OK).json(series);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getSeries;
