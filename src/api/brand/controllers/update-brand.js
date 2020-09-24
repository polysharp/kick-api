const HTTP_CODE = require('http-status-codes');

const { Brand, brandJoiSchema } = require('../models');

const updateBrand = async (req, res) => {
  try {
    const { error } = brandJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map(detail => detail.message),
        error
      });

    const brandExists = await Brand.findById(req.params.id);
    if (!brandExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    await Brand.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    });

    const updatedBrand = await Brand.findById(req.params.id);

    return res.set(HTTP_CODE.OK).json(updatedBrand);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = updateBrand;
