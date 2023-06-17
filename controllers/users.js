const User = require('../models/user');
const {
  INVALID_ARGUMENTS_ERROR,
  NOT_FOUND_ERROR,
  ERROR,
  SOMETHING_WENT_WRONG_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_WRONG_ID_MESSAGE,
  INVALID_ARGUMENTS_MESSAGE,
} = require('../errors/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }

      return res.status(NOT_FOUND_ERROR).send({ message: USER_NOT_FOUND_MESSAGE });
    })
    .catch((error) => (
      error.name === 'CastError'
        ? res.status(INVALID_ARGUMENTS_ERROR).send({ message: USER_WRONG_ID_MESSAGE })
        : res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE })
    ));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => (
      error.name === 'ValidationError'
        ? res.status(INVALID_ARGUMENTS_ERROR).send({ message: INVALID_ARGUMENTS_MESSAGE })
        : res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE })
    ));
};

module.exports.updateUserInfo = (req, res) => {
  const { _id: userId } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send(user))
    .catch((error) => (
      error.name === 'ValidationError'
        ? res.status(INVALID_ARGUMENTS_ERROR).send({ message: INVALID_ARGUMENTS_MESSAGE })
        : res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE })
    ));
};

module.exports.updateUserAvatar = (req, res) => {
  const { _id: userId } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send(user))
    .catch((error) => (
      error.name === 'ValidationError'
        ? res.status(INVALID_ARGUMENTS_ERROR).send({ message: INVALID_ARGUMENTS_MESSAGE })
        : res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE })
    ));
};
