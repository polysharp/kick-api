const HTTP_CODE = require('http-status-codes');

const { Category, categoryJoiSchema } = require('../models');

const updateCategory = async (req, res) => {
  try {
    const { error } = categoryJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map((detail) => detail.message),
        error,
      });

    const categoryExists = await Category.findById(req.params.id);
    if (!categoryExists) return res.sendStatus(HTTP_CODE.NOT_FOUND);

    await Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });

    const updatedCategory = await Category.findById(req.params.id);

    return res.set(HTTP_CODE.OK).json(updatedCategory);
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = updateCategory;
