const HTTP_CODE = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, joiUserSchema } = require('../../models/User');

const register = async (req, res) => {
  try {
    const { error } = joiUserSchema.validate(req.body, { abortEarly: false });

    if (error)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        error
      });

    const userExists = await User.findOne({
      email: req.body.email
    });

    if (userExists)
      return res.set(HTTP_CODE.BAD_REQUEST).json({
        message: 'Email already used.'
      });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword
    });

    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);

    return res.set(HTTP_CODE.CREATED).json({
      auth: token
    });
  } catch (error) {
    return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = register;
