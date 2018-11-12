const express = require('express');
const router = express.Router();
const { Address, Contact, Phone, Email } = require('../models');

/* GET contacts. */
router.get('/', (req, res, next) => {
  Contact.getAll()
    .then(data => res.send(data))
    .catch(err => next(err));
});

/* POST contacts. */
router.post('/', (req, res, next) => {
  const { body } = req;
  let { phones, emails, addresses } = body;

  if (!(phones && phones.length)
    || !(emails && emails.length)) {
    return res.sendStatus(400);
  }

  const contact = new Contact({
    firstName: body.firstName,
    lastName: body.lastName,
    birth: new Date(body.dob),
  })

  addresses = addresses.map(address => new Address(address));
  phones = phones.map(phone => new Phone(phone));
  emails = emails.map(email => new Email(email));


  contact.addAddresses(addresses);
  contact.addPhones(phones);
  contact.addEmails(emails);

  contact.store()
    .then(() => res.sendStatus(201))
    .catch(err => next(err));
});

/* DELETE contacts. */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Contact.delete(id)
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

/* POST phone. */
router.post('/:id/phones', (req, res, next) => {
  const { id } = req.params;
  const { phone } = req.body;
  if (!id || !phone) return res.sendStatus(400);
  new Phone(phone).store(id)
    .then(() => res.sendStatus(201))
    .catch(err => next(err))
});

/* POST address. */
router.post('/:id/addresses', (req, res, next) => {
  const { id } = req.params;
  const address = req.body;
  if (!id || !address) return res.sendStatus(400);
  new Address(address).store(id)
    .then(() => res.sendStatus(201))
    .catch(err => next(err))
});

/* POST email. */
router.post('/:id/emails', (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;
  if (!id || !email) return res.sendStatus(400);
  new Email(email).store(id)
    .then(() => res.sendStatus(201))
    .catch(err => next(err))
});

module.exports = router;
