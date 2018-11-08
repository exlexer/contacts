const express = require('express');
const router = express.Router();
// const { Address, Contact, PhoneNumber } = require('./models');

/* GET contacts. */
router.get('/contacts', function(req, res, next) {
  res.sendStatus(200);
});

/* POST contacts. */
router.post('/contacts', function(req, res, next) {
  res.sendStatus(201);
});

/* POST contacts. */
router.post('/contacts/phone', function(req, res, next) {
  res.sendStatus(201);
});

/* POST contacts. */
router.post('/contacts/address', function(req, res, next) {
  res.sendStatus(201);
});

module.exports = router;
