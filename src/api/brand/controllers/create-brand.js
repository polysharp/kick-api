const HTTP_CODE = require('http-status-codes');

const { Brand, brandJoiSchema } = require('../models');

const createBrand = async (req, res) => {
  try {
    const { error } = brandJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map((detail) => detail.message),
        error,
      });

    const brandFromDb = await Brand.find({ name: req.body.name });

    if (brandFromDb.length > 0)
      return res.status(HTTP_CODE.CONFLICT).json({
        status: HTTP_CODE.CONFLICT,
        msg: `Brand with name (${req.body.name}) already exists.`,
      });

    const brand = new Brand({
      name: req.body.name,
    });

    brand.save();

    return res.status(HTTP_CODE.OK).json(brand);
  } catch (err) {
    console.log(err);
    return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createBrand;

// TODO : trim and toLowerCase brand names before saving to db => check the existance of brand in db by triming and lowercasing'em
