import express from 'express';
import Address from '../models/Address';

const router = express.Router();

/* PATCH address. */
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { address } = req.body;
  if (!id || !address) res.status(400).send('Please complete information');
  Address.getById(id)
    .then((found) => found.update(address))
    .then(() => res.status(200).send('Address has been updated'))
    .catch((err) => next(err));
});

/* DELETE address. */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!id) res.status(400).send('Please complete information');
  Address.delete(id)
    .then(() => res.status(200).send('Address has been deleted'))
    .catch((err) => next(err));
});

export default router;
