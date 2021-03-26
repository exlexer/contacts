const express = require('express');

const router = express.Router();
const { Phone } = require('../models');

/* PATCH phone. */
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { phone } = req.body;
  if (!id || !phone) res.status(400).send('Please complete information');
  Phone.getById(id)
    .then(found => found.update(phone))
    .then(() => res.status(200).send('Phone has been updated'))
    .catch(err => next(err));
});

/* DELETE phone. */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('Please complete information');
  Phone.delete(id)
    .then(() => res.status(200).send('Phone has been deleted'))
    .catch(err => next(err));
});

module.exports = router;
