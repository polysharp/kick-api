const HTTP_CODE = require('http-status-codes');

const { Product, productJoiSchema } = require('../models');

const updateProduct = async (req, res) => {
  try {
    const { error } = productJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map(detail => detail.message),
        error
      });

    const productExists = await Product.findById(req.params.id);
    if (!productExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    await Product.findByIdAndUpdate(req.params.id, {
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

    const updatedProduct = await Product.findById(req.params.id);

    return res.set(HTTP_CODE.OK).json(updatedProduct);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = updateProduct;
