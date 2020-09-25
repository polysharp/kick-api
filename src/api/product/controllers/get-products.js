const HTTP_CODE = require('http-status-codes');

const { Category } = require('../../category/models');
const { Product } = require('../models');
const { Variant } = require('../../variant/models');
const { Brand } = require('../../brand/models');
const { Serie } = require('../../serie/models');

const getProducts = async (_, res) => {
  try {
    const categories = await Category.find({}, { projection: { id: true } });
    if (categories.length < 1)
      return res
        .status(HTTP_CODE.NOT_FOUND)
        .json({ status: HTTP_CODE.NOT_FOUND, msg: 'no category found' });

    const variants = await Variant.find();
    if (variants.length < 1)
      return res
        .status(HTTP_CODE.NOT_FOUND)
        .json({ status: HTTP_CODE.NOT_FOUND, msg: 'no variant found' });

    const products = await Product.find();
    if (products.length < 1) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    const brands = await Brand.find();
    const series = await Serie.find();

    const resProducts = {};
    const catIds = categories.map((c) => c.id);
    catIds.forEach((id) => {
      resProducts[id] = {};
    });

    Object.keys(resProducts).forEach((category) => {
      const brandsFilter = {
        type: 'BRAND',
        values: [],
      };

      const seriesFilter = {
        type: 'SERIE',
        values: [],
      };

      const colorsFilter = {
        type: 'COLOR',
        values: [],
      };

      const priceFilter = {
        type: 'PRICE',
        min: undefined,
        max: undefined,
      };

      resProducts[category].products = products.filter((e) => e.category === category);

      resProducts[category].products.forEach((product) => {
        brands
          .filter((b) => b.id === product.brand)
          .forEach((brand) => {
            if (brandsFilter.values.filter((value) => value.id === brand.id).length < 1)
              brandsFilter.values.push({ id: brand.id, name: brand.name });
          });

        series
          .filter((s) => s.id === product.serie)
          .forEach((serie) => {
            if (seriesFilter.values.filter((value) => value.id === serie.id).length < 1)
              seriesFilter.values.push({
                id: serie.id,
                brand: serie.brandId,
                name: serie.name,
                release: serie.release,
              });
          });

        variants
          .filter((v) => v.productId === product.id)
          .forEach((variant) => {
            if (colorsFilter.values.filter((value) => value.code === variant.color.code).length < 1)
              colorsFilter.values.push(variant.color);

            if (variant.price < priceFilter.min || !priceFilter.min)
              priceFilter.min = variant.price;
            if (variant.price > priceFilter.max || !priceFilter.max)
              priceFilter.max = variant.price;
          });
      });

      resProducts[category].filters = [brandsFilter, seriesFilter, colorsFilter, priceFilter];
    });

    return res.set(HTTP_CODE.OK).json(resProducts);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getProducts;
