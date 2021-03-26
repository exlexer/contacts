const express = require('express');

const router = express.Router();
const { Email } = require('../models');

/* PATCH email. */
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;
  if (!id || !email) res.status(400).send('Please complete information');
  Email.getById(id)
    .then(found => found.update(email))
    .then(() => res.status(200).send('Email has been updated'))
    .catch(err => next(err));
});

/* DELETE email. */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!id) res.status(400).send('Please complete information');
  Email.delete(id)
    .then(() => res.status(200).send('Email has been deleted'))
    .catch(err => next(err));
});

module.exports = router;
