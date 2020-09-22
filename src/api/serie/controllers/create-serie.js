const HTTP_CODE = require('http-status-codes');

const { Serie, serieJoiSchema } = require('../models');

const createSerie = async (req, res) => {
  try {
    const { error } = serieJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map(detail => detail.message),
        error
      });

    const serieExits = await Serie.find({ brandId: req.body.brandId });
    if (serieExits)
      serieExits.forEach(serie => {
        if (serie.name === req.body.name)
          return res.status(HTTP_CODE.CONFLICT).json({
            status: HTTP_CODE.CONFLICT,
            msg: `Serie with name (${req.body.name}) for Brand with id (${req.body.brandId}) already exists.`
          });
        return null;
      });

    const serie = new Serie({
      brandId: req.body.brandId,
      name: req.body.name,
      release: req.body.release
    });

    serie.save();

    return res.set(HTTP_CODE.OK).json(serie);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createSerie;
