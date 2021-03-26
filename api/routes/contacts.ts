import express from 'express';

import { IAddress } from '../models/types';

import Address from '../models/Address';
import Contact from '../models/Contact';
import Phone from '../models/Phone';
import Email from '../models/Email';

const router = express.Router();

/* GET contacts. */
router.get('/', (req, res, next) => {
  Contact.getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

/* POST contacts. */
router.post('/', (req, res, next) => {
  const { body } = req;
  let { phones, emails, addresses } = body;

  if (!(phones && phones.length) || !(emails && emails.length)) {
    res.status(400).send('Please complete information');
  }

  const contact = new Contact({
    firstName: body.firstName,
    lastName: body.lastName,
    birth: new Date(body.dob),
  });

  addresses = addresses.map((address: IAddress) => new Address(address));
  phones = phones.map((phone: string) => new Phone(phone));
  emails = emails.map((email: string) => new Email(email));

  contact.addAddresses(addresses);
  contact.addPhones(phones);
  contact.addEmails(emails);

  contact
    .store()
    .then(() => res.status(201).send('Contact has been created'))
    .catch((err) => next(err));
});

/* DELETE contacts. */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Contact.delete(id)
    .then(() => res.status(200).send('Contact has been deleted'))
    .catch((err) => next(err));
});

/* PATCH contacts. */
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const contact = req.body;
  if (!id || !contact) res.status(400).send('Please complete information');
  Contact.getById(id)
    .then((found) => found.update(contact))
    .then(() => res.status(200).send('Contact has been updated'))
    .catch((err) => next(err));
});

/* POST phone. */
router.post('/:id/phones', (req, res, next) => {
  const { id } = req.params;
  const { phone } = req.body;
  if (!id || !phone) res.status(400).send('Please complete information');
  new Phone(phone)
    .store(id)
    .then(() => res.status(201).send('Phone has been added'))
    .catch((err) => next(err));
});

/* POST address. */
router.post('/:id/addresses', (req, res, next) => {
  const { id } = req.params;
  const address = req.body;
  if (!id || !address) res.status(400).send('Please complete information');
  new Address(address)
    .store(id)
    .then(() => res.status(201).send('Address has been added'))
    .catch((err) => next(err));
});

/* POST email. */
router.post('/:id/emails', (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;
  if (!id || !email) res.status(400).send('Please complete information');
  new Email(email)
    .store(id)
    .then(() => res.status(201).send('Email has been added'))
    .catch((err) => next(err));
});

export default router;
