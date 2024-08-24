var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importiert das CORS-Paket
var bodyParser = require('body-parser'); // Importiert das Body-Parser-Paket
var db = require('./models/db'); // Importiert die db.js Datei

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionsRouter = require('./routes/sessions');
var highscoresRouter = require('./routes/highscores');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json()); // Aktiviert die Body-Parser-Middleware
app.use(cors()); // Aktiviert CORS für alle Routen
app.use(express.urlencoded({ extended: false })); // Aktiviert die URL-Codierungsmiddleware
app.use(cookieParser()); // Aktiviert die Cookie-Parser-Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Aktiviert die statische Dateimiddleware

// Registrierung der Routen
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/highscores', highscoresRouter);

// 404-Handler
app.use(function(req, res, next) {
  res.status(404).send('Sorry, cannot be found!');
});

// Fehlerbehandlungs-Middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;