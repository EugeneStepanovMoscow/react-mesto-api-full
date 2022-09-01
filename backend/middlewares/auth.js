const jwt = require('jsonwebtoken');
const notFoundError = require('../errors/notFoundError');
require('dotenv').config();
const { JWT_SECRET } = process.env;

module.exports.authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodet) => {
      if (err) {
        throw new notFoundError(`Ошибка верификации токена ${err}`);
      }
      req.user = {
        _id: decodet.id,
      };
      console.log(req.user);
      return req.user;
    });
  } else {
    throw new notFoundError(`Токен не найден`);
  }
  next();
};
