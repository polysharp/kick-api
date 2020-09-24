const HTTP_CODE = require('http-status-codes');
const mongoose = require('mongoose');

const refIsValidAndExist = async (ref, Model) => {
  const isValidId = mongoose.Types.ObjectId.isValid(ref);
  if (!isValidId)
    return {
      status: HTTP_CODE.BAD_REQUEST,
      mdg: "the references isn't a valid ObjectId"
    };

  const result = await Model.findById(ref);
  if (!result)
    return {
      status: HTTP_CODE.BAD_REQUEST,
      mdg: "brandId isn't a valid ObjectId"
    };

  return null;
};

module.exports = refIsValidAndExist;
