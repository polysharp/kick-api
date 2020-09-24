const HTTP_CODE = require('http-status-codes');

const { Product, productJoiSchema } = require('../models');

const createProduct = async (req, res) => {
  try {
    const { error } = productJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map(detail => detail.message),
        error
      });

    const productFromDb = await Product.find({ name: req.body.name });

    if (productFromDb)
      return res.status(HTTP_CODE.CONFLICT).json({
        status: HTTP_CODE.CONFLICT,
        msg: `Product with name (${req.body.name}) already exists.`
      });

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      brand: req.body.body,
      serie: req.body.serie,
      category: req.body.category,
      rate: {
        score: req.body.rate.score,
        amount: req.body.rate.amount
      }
    });

    product.save();

    return res.status(HTTP_CODE.OK).json(product);
  } catch (err) {
    console.log(err);
    return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createProduct;
