const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { DB_URI } = require('./constants/db');
const { DEFAULT_PORT } = require('./constants/conn');

mongoose.connect(DB_URI, { useNewUrlParser: true });

const { PORT = DEFAULT_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.use(errors());
app.use(require('./middlewares/error-handling'));

app.listen(PORT);
