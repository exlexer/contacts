const express = require('express');
const router = express.Router();
const { Address, Contact, Phone, Email } = require('./models');

/* GET contacts. */
router.get('/contacts', (req, res, next) => {
  res.sendStatus(200);
});

/* POST contacts. */
router.post('/contacts', (req, res, next) => {
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
    .catch(err => {
      console.log(err);
      next(err)
    });
});

/* POST contacts. */
router.post('/contacts/phone', (req, res, next) => {
  res.sendStatus(201);
});

/* POST contacts. */
router.post('/contacts/address', (req, res, next) => {
  res.sendStatus(201);
});

module.exports = router;
