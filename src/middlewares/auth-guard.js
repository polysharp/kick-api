const jwt = require('jsonwebtoken');
const HTTP_CODE = require('http-status-codes');

const authGuard = (req, res, next) => {
  let token;
  const bearer = req.headers.authorization;

  if (!bearer) return res.set(HTTP_CODE.UNAUTHORIZED).json({ msg: 'Access denied.' });

  const parts = bearer.split(' ');

  if (parts.length === 2 && parts[0] === 'Bearer') [, token] = parts;

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    return next();
  } catch (err) {
    return res.set(HTTP_CODE.BAD_REQUEST).json({ msg: 'Invalid Token.' });
  }
};

module.exports = authGuard;
