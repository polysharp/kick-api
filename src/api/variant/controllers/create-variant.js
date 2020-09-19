const HTTP_CODE = require('http-status-codes');

const createVariant = async (req, res) => {
  try {
    return res.set(HTTP_CODE.OK).json({
      route: 'createVariant'
    });
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = createVariant;
