const router = require('express').Router({ caseSensitive: true, strict: true });

const variant = require('./variant');

router.route('/variants').get(variant.getVariants);
router.route('/variant').post(variant.createVariant);
router
  .route('/variant/:id')
  .get(variant.getVariant)
  .put(variant.updateVariant)
  .delete(variant.deleteVariant);

module.exports = router;
