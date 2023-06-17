const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const CONNECTION_URL = 'mongodb://127.0.0.1:27017/';
const DB_NAME = 'mestodb';
const app = express();

mongoose.connect(`${CONNECTION_URL}${DB_NAME}`, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '648cba72a483496e2c5c7081',
  };

  next();
});
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
