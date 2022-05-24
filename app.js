require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cardsRouter = require('./routes/cardsRoutes');
var playerRouter = require('./routes/playerRoutes');
var gameRouter = require('./routes/gameRoutes');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("Arbitrator"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/cards',cardsRouter);
app.use('/api/players', playerRouter);
app.use('/api/game', gameRouter)
app.use('/api/rooms')
module.exports = app;
