const router = require('express').Router();

// подключение
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards,
  addCard,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([\da-z\.]{2,6})([\/\d\w\.-]*)*\/?$/i;

// Получаем все карточки
router.get('/', getAllCards);
// Добавляем карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlPattern).required(),
  }),
}), addCard);
// Удаление карточки по ID
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);
// поставить лайк карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), addLike);
// убрать лайк с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteLike);

module.exports = router;
