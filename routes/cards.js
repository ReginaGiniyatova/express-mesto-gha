const cards = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  setCardLike,
  setCardDislike,
} = require('../controllers/cards');

cards.get('/', getCards);
cards.post('/', createCard);
cards.delete('/:cardId', deleteCardById);
cards.put('/:cardId/likes', setCardLike);
cards.delete('/:cardId/likes', setCardDislike);

module.exports = cards;
