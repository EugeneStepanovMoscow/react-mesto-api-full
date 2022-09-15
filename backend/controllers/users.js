const bcrypt = require('bcrypt'); // подключение шифровальщика
const jwt = require('jsonwebtoken');

const User = require('../models/user'); // работа с БД модели User
// блок ошибок
const ConflictError = require('../errors/conflictError');
const DataError = require('../errors/dataError');
const NotFoundError = require('../errors/notFoundError');
const UnauthorizedError = require('../errors/unauthorizedError');

// При переносе подключения в app перестает работать обращение к env
// в следствии чего останавливается сервер при создании нового пользователя

const { JWT_SECRET } = process.env;
const jwtLifeTime = '1d';

// создание нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name, about, avatar,
      }) // в базу записывается хеш
        .then((dataFromDB) => res.status(201).send({ message: `Пользователи с email: ${dataFromDB.email} создан` }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new DataError(`${err}Введите корректные данные`));
          } else if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким Email уже существует'));
          } else {
            next(err);
          }
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверный email или пароль');
      }
      return bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          throw new UnauthorizedError('Неверный email или пароль');
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: jwtLifeTime });
        return res.status(200).send({ token });
      });
    })
    .catch(next);
};

module.exports.logout = (req, res) => res.clearCookie('access_token').status(200).send({ message: 'Токен удален' });

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((userFromBD) => {
      if (!userFromBD) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      return res.send(userFromBD);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Введите корректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((dataFromDB) => res.status(200).send(dataFromDB))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Введите корректные данные'));
      } else {
        next(err);
      }
    });
};
//--------------------------------------------------------
module.exports.profileUserUpdate = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((dataFromDB) => res.send({ message: dataFromDB }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные при обновлении профиля'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Пользователь с указанным _id не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.avatarUserUpdate = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((dataFromDB) => res.send({ dataFromDB }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные при обновлении аватара'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Пользователь с указанным _id не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.getRegisteredUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((dataFromDB) => res.send(dataFromDB))
    .catch(next);
};
