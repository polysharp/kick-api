const HTTP_CODE = require('http-status-codes');
const mongoose = require('mongoose');

const refIsValidAndExist = async (ref, Model) => {
  const isValidId = mongoose.Types.ObjectId.isValid(ref);
  if (!isValidId)
    return {
      status: HTTP_CODE.BAD_REQUEST,
      mdg: `the ref (${ref}) isn't a valid ObjectId`,
    };

  const result = await Model.findById(ref);
  if (!result)
    return {
      status: HTTP_CODE.BAD_REQUEST,
      mdg: `(${Model.collection.name}) doesn't contain object with ref (${ref})`,
    };

  return null;
};

module.exports = refIsValidAndExist;
