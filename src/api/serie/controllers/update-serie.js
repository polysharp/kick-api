const HTTP_CODE = require('http-status-codes');

const { Serie, serieJoiSchema } = require('../models');

const updateSerie = async (req, res) => {
  try {
    const { error } = serieJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map((detail) => detail.message),
        error,
      });

    const serieExists = await Serie.findById(req.params.id);
    if (!serieExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    await Serie.findByIdAndUpdate(req.params.id, {
      brandId: req.body.brandId,
      name: req.body.name,
      release: req.body.release,
    });

    const updatedSerie = await Serie.findById(req.params.id);

    return res.set(HTTP_CODE.OK).json(updatedSerie);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = updateSerie;

// TODO : verifier brand id est vraiment brand id et pas un id perdu dans la nature
