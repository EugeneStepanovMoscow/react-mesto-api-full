module.exports.errorsCheck = (err, req, res) => {
  res.status(505).send({ message: 'тестовая ошибка' });
};
