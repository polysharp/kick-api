const HTTP_CODE = require('http-status-codes');

const { Serie, serieJoiSchema } = require('../models');
const { Brand } = require('../../brand/models');
const { refIsValidAndExist } = require('../../../helpers');

const createSerie = async (req, res) => {
  try {
    let { error } = serieJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map((detail) => detail.message),
        error,
      });

    error = await refIsValidAndExist(req.body.brandId, Brand);
    if (error) return res.status(HTTP_CODE.BAD_REQUEST).json(error);

    const serie = new Serie({
      brandId: req.body.brandId,
      name: req.body.name,
      release: req.body.release,
    });

    return serie.save((err) => {
      if (err)
        return res.status(HTTP_CODE.CONFLICT).json({
          status: HTTP_CODE.CONFLICT,
          msg: `Serie with name (${req.body.name}) already exists.`,
        });
      return res.status(HTTP_CODE.OK).json(serie);
    });
  } catch (err) {
    return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createSerie;
