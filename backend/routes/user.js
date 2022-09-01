const router = require('express').Router();
// подключение контроллеров

const { celebrate, Joi } = require('celebrate');
const {
  findUser,
  getAllUsers,
  profileUserUpdate,
  avatarUserUpdate,
  getRegisteredUser,
} = require('../controllers/users');

const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([\da-z\.]{2,6})([\/\d\w \.-]*)*\/?$/i;

// получаем всх пользователей
router.get('/', getAllUsers);

router.get('/me', getRegisteredUser);

// поиск пользователя по id
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), findUser);
// обновление профиля

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), profileUserUpdate);

// изменение аватара
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlPattern),
  }),
}), avatarUserUpdate);

module.exports = router;
