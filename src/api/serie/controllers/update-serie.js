const HTTP_CODE = require('http-status-codes');

const { Serie, serieUpdateJoiSchema } = require('../models');

const updateSerie = async (req, res) => {
  try {
    const { error } = serieUpdateJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        error
      });

    const serieExists = await Serie.findOne({
      _id: req.params.id
    });
    if (!serieExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    await Serie.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      release: req.body.release
    });

    const updatedSerie = await Serie.findOne({
      _id: req.params.id
    });

    return res.set(HTTP_CODE.OK).json(updatedSerie);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = updateSerie;
