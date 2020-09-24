const HTTP_CODE = require('http-status-codes');
const mongoose = require('mongoose');

const { Serie, serieJoiSchema } = require('../models');
const { Brand } = require('../../brand/models');

const createSerie = async (req, res) => {
  try {
    const { error } = serieJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map(detail => detail.message),
        error
      });

    const isValidId = mongoose.Types.ObjectId.isValid(req.body.brandId);
    if (isValidId) {
      const brandExists = await Brand.findById(req.body.brandId);
      if (!brandExists)
        return res.status(HTTP_CODE.BAD_REQUEST).json({
          status: HTTP_CODE.BAD_REQUEST,
          mdg: "Brand doesn't exist"
        });
    } else
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        mdg: "brandId isn't a valid ObjectId"
      });

    // const serieExits = await Serie.find({ brandId: req.body.brandId });
    // if (serieExits)
    //   serieExits.forEach(serie => {
    //     if (serie.name === req.body.name)
    //       return res.status(HTTP_CODE.CONFLICT).json({
    //         status: HTTP_CODE.CONFLICT,
    //         msg: `Serie with name (${req.body.name}) for Brand with id (${req.body.brandId}) already exists.`
    //       });
    //     return null;
    //   });

    const serie = new Serie({
      brandId: req.body.brandId,
      name: req.body.name,
      release: req.body.release
    });

    return serie.save(err => {
      if (err)
        return res.status(HTTP_CODE.CONFLICT).json({
          status: HTTP_CODE.CONFLICT,
          msg: `Serie with name (${req.body.name}) already exists.`
        });
      return res.status(HTTP_CODE.OK).json(serie);
    });
  } catch (err) {
    return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createSerie;
