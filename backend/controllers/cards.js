const Card = require('../models/card'); // работа с БД модели Card
// блок ошибок
const DataError = require('../errors/dataError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((dataFromDB) => res.send(dataFromDB))
    .catch((err) => next(err))
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((dataFromDB) => res.send(dataFromDB))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Введите корректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!(card.owner._id.toString() === req.user._id)) {
        throw new ForbiddenError('Нет прав для редактирования карточки');
        // return res.status(401).send({message: `Нет прав для редактирования карточки`})
      }
      Card.findByIdAndDelete(req.params.id)
        .then((cardDeleted) => res.status(200).send({ message: `Карточка ${cardDeleted.name} удалена` }))
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Введите корректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((dataFromBD) => {
      if (!dataFromBD) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      return res.status(200).send(dataFromBD);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((dataFromBD) => {
      if (!dataFromBD) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      return res.status(200).send(dataFromBD);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
