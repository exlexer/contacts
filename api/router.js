const express = require('express');

const router = express.Router();
const {
  contacts, addresses, phones, emails,
} = require('./routes');

router.use('/contacts', contacts);
router.use('/addresses', addresses);
router.use('/phones', phones);
router.use('/emails', emails);

module.exports = router;
