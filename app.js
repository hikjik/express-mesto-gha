const express = require('express');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6354b9d2171eeaa9b2157287',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// handle unmatched routes
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ message: 'Некорректный путь' });
});

app.listen(PORT);
