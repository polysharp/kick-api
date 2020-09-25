const HTTP_CODE = require('http-status-codes');

const { Category, categoryJoiSchema } = require('../models');

const createCategory = async (req, res) => {
  try {
    const { error } = categoryJoiSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        status: HTTP_CODE.BAD_REQUEST,
        msg: error.details.map((detail) => detail.message),
        error,
      });

    const category = new Category({
      name: req.body.name,
    });

    return category.save((err) => {
      if (err)
        return res.status(HTTP_CODE.CONFLICT).json({
          status: HTTP_CODE.CONFLICT,
          msg: `Category with name (${req.body.name}) already exists.`,
        });
      return res.status(HTTP_CODE.OK).json(category);
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createCategory;
