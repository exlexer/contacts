const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

const router = require('./api/router');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/dist'));
app.use('/api', router);

app.use((err, req, res, next) => {
  if (process.env.LOADED_MOCHA_OPTS !== 'true') {
    console.log(err);
  }
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.send(err);
});

module.exports = app;