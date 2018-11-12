const express = require('express');
const router = express.Router();
const { Address } = require('../models');

/* PATCH address. */
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { address } = req.body;
  if (!id || !address) return res.sendStatus(400);
  Address.getById(id)
    .then(found => found.update(address))
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
});

/* DELETE address. */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);
  Address.delete(id)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
});

module.exports = router;
