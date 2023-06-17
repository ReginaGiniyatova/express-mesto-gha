const Card = require('../models/card');
const {
  INVALID_ARGUMENTS_ERROR,
  NOT_FOUND_ERROR,
  ERROR,
  SOMETHING_WENT_WRONG_MESSAGE,
  INVALID_ARGUMENTS_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  CARD_WRONG_ID_MESSAGE,
} = require('../errors/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE }));
};

module.exports.createCard = (req, res) => {
  const { _id: userId } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send(card))
    .catch((error) => (
      error.name === 'ValidationError'
        ? res.status(INVALID_ARGUMENTS_ERROR).send({ message: INVALID_ARGUMENTS_MESSAGE })
        : res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE })
    ));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (card) {
        return res.send(card);
      }

      return res.status(NOT_FOUND_ERROR).send({ message: CARD_NOT_FOUND_MESSAGE });
    })
    .catch((error) => (
      error.name === 'CastError'
        ? res.status(INVALID_ARGUMENTS_ERROR).send({ message: CARD_WRONG_ID_MESSAGE })
        : res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE })
    ));
};

module.exports.setCardLike = (req, res) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }

      return res.status(NOT_FOUND_ERROR).send({ message: CARD_NOT_FOUND_MESSAGE });
    })
    .catch((error) => (
      error.name === 'CastError'
        ? res.status(INVALID_ARGUMENTS_ERROR).send({ message: INVALID_ARGUMENTS_MESSAGE })
        : res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE })
    ));
};

module.exports.setCardDislike = (req, res) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }

      return res.status(NOT_FOUND_ERROR).send({ message: CARD_NOT_FOUND_MESSAGE });
    })
    .catch((error) => (
      error.name === 'CastError'
        ? res.status(INVALID_ARGUMENTS_ERROR).send({ message: INVALID_ARGUMENTS_MESSAGE })
        : res.status(ERROR).send({ message: SOMETHING_WENT_WRONG_MESSAGE })
    ));
};
