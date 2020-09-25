const HTTP_CODE = require('http-status-codes');

const { Product } = require('../models');
const { Variant } = require('../../variant/models');
const { Serie } = require('../../serie/models');
const { Brand } = require('../../brand/models');
const { Category } = require('../../category/models');

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(HTTP_CODE.NOT_FOUND).json({
        status: HTTP_CODE.NOT_FOUND,
        msg: 'Product not found',
      });

    const variants = await Variant.find({ productId: req.params.id });
    if (variants.length < 1)
      return res.status(HTTP_CODE.NOT_FOUND).json({
        status: HTTP_CODE.NOT_FOUND,
        msg: `Product with id (${req.params.id}) has no variants`,
      });

    const availableVariants = variants.filter((variant) => variant.quantity > 0);
    if (availableVariants.length < 1)
      return res.status(HTTP_CODE.NOT_FOUND).json({
        status: HTTP_CODE.NOT_FOUND,
        msg: `Product with id (${req.params.id}) isn't in stock`,
      });

    const category = await Category.findById(product.category);
    const brand = await Brand.findById(product.brand);
    const serie = await Serie.findById(product.serie);

    const formattedProduct = {
      id: product.id,
      ref: product.ref,
      name: product.name,
      description: product.description,
      brand: {
        id: brand.id,
        name: brand.name,
      },
      serie: {
        id: serie.id,
        name: serie.name,
        release: serie.release,
      },
      category: {
        id: category.id,
        name: category.name,
      },
      variants: availableVariants.map((variant) => ({
        id: variant.id,
        ref: variant.ref,
        color: variant.color,
        price: variant.price,
        brand: variant.quantity,
      })),
    };

    return res.status(HTTP_CODE.OK).json(formattedProduct);
  } catch (err) {
    res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
    return err;
  }
};

module.exports = getProduct;
