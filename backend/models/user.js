const mongoose = require('mongoose');

// схема пользователя в базе
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([\da-z\.]{2,6})([\/\d\w \.-]*)*\/?$/i.test(v);
      },
      message: (props) => `${props.value} Некорректный адрес ссылки`,
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator() {
        return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
      },
      message: (props) => `${props.value} Некорректно указан Email`,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
