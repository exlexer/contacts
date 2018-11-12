const express = require('express');
const router = express.Router();
const { Email } = require('../models');

/* PATCH email. */
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;
  if (!id || !email) return res.sendStatus(400);
  Email.getById(id).update(email)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
});

/* DELETE email. */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);
  Email.delete(id)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
});

module.exports = router;
