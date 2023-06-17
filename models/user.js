const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlenght: 30,
    required: true,
    validate: {
      validator: ({ length }) => length >= 2 && length <= 30,
      message: 'Имя должно быть от 2 до 30 символов.',
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlenght: 30,
    required: true,
    validate: {
      validator: ({ length }) => length >= 2 && length <= 30,
      message: 'Описание должно быть от 2 до 30 символов.',
    },
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: ({ length }) => length > 0,
      message: 'Ссылка на аватарку не должна быть пустой.',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
