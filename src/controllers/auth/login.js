const HTTP_CODE = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, joiLoginSchema } = require('../../models/User');

const login = async (req, res) => {
  try {
    const { error } = joiLoginSchema.validate(req.body, { abortEarly: false });

    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        error
      });

    const user = await User.findOne({
      email: req.body.email
    });

    if (!user)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        message: 'Email or password is wrong.'
      });

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        message: 'Email or password is wrong.'
      });

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);

    return res.set(HTTP_CODE.OK).json({
      auth: token
    });
  } catch (err) {
    return res.set(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = login;
