const HTTP_CODE = require('http-status-codes');

const { Serie, serieJoiSchema } = require('../models');

const createSerie = async (req, res) => {
  try {
    const { error } = serieJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        error
      });

    const serie = new Serie({
      belongId: req.body.belongId,
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
