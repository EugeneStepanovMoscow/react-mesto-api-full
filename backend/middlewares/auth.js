const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const { JWT_SECRET } = process.env;

module.exports.authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodet) => {
      if (err) {
        throw new UnauthorizedError('Ошибка авторизации');
      }
      req.user = {
        _id: decodet.id,
      };
      return req.user;
    });
  } else {
    throw new UnauthorizedError('Ошибка авторизации');
  }
  next();
};
