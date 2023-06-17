const users = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:userId', getUserById);
users.post('/', createUser);
users.patch('/me', updateUserInfo);
users.patch('/me/avatar', updateUserAvatar);

module.exports = users;
