const HTTP_CODE = require('http-status-codes');

const { Product, productJoiSchema } = require('../models');
const { Brand } = require('../../brand/models');
const { Serie } = require('../../serie/models');
const { Category } = require('../../category/models');
const { refIsValidAndExist } = require('../../../helpers');

const createProduct = async (req, res) => {
  try {
    let { error } = productJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map((detail) => detail.message),
        error,
      });

    error = await refIsValidAndExist(req.body.brand, Brand);
    if (error) return res.status(HTTP_CODE.BAD_REQUEST).json(error);

    error = await refIsValidAndExist(req.body.serie, Serie);
    if (error) return res.status(HTTP_CODE.BAD_REQUEST).json(error);

    error = await refIsValidAndExist(req.body.category, Category);
    if (error) return res.status(HTTP_CODE.BAD_REQUEST).json(error);

    const product = new Product({
      ref: req.body.ref,
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      serie: req.body.serie,
      category: req.body.category,
      rate: {
        score: req.body.rate.score,
        amount: req.body.rate.amount,
      },
    });

    return product.save((err) => {
      if (err)
        return res.status(HTTP_CODE.CONFLICT).json({
          status: HTTP_CODE.CONFLICT,
          msg: `Product with reference (${req.body.ref}) already exists.`,
        });
      return res.status(HTTP_CODE.OK).json(product);
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createProduct;
