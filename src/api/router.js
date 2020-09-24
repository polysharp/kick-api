const router = require('express').Router({ caseSensitive: true, strict: true });

const variant = require('./variant');
const serie = require('./serie');
const brand = require('./brand');
const product = require('./product');
const category = require('./category');

/* Variant */
router.route('/variants').get(variant.getVariants);
router.route('/variant').post(variant.createVariant);
router
  .route('/variant/:id')
  .get(variant.getVariant)
  .put(variant.updateVariant)
  .delete(variant.deleteVariant);

/* Serie */
router.route('/series').get(serie.getSeries);
router.route('/serie').post(serie.createSerie);
router
  .route('/serie/:id')
  .get(serie.getSerie)
  .put(serie.updateSerie)
  .delete(serie.deleteSerie);

/* Brand */
router.route('/brands').get(brand.getBrands);
router.route('/brand').post(brand.createBrand);
router
  .route('/brand/:id')
  .get(brand.getBrand)
  .put(brand.updateBrand)
  .delete(brand.deleteBrand);

/* Product */
router.route('/products').get(product.getProducts);
router.route('/product').post(product.createProduct);
router
  .route('/product/:id')
  .get(product.getProduct)
  .put(product.updateProduct)
  .delete(product.deleteProduct);

/* Category */
router.route('/categories').get(category.getCategories);
router.route('/category').post(category.createCategory);
router
  .route('/category/:id')
  .get(category.getCategory)
  .put(category.updateCategory)
  .delete(category.deleteCategory);

module.exports = router;
