const express = require('express');
const router = express.Router();
const { Phone } = require('../models');

/* GET phone. */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);
  Phone.getById(id)
    .then(phone => res.send(phone))
    .catch(err => next(err))
});

/* PATCH phone. */
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { phone } = req.body;
  if (!id || !phone) return res.sendStatus(400);
  Phone.getById(id)
    .then(found => found.update(phone))
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
});

/* DELETE phone. */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);
  Phone.delete(id)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
});

module.exports = router;
