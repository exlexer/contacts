const { db } = require('../lib');

class Contact {
  constructor({ firstName, lastName, birth }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birth = birth;
    this.addresses = [];
    this.phones = [];
    this.emails = [];
  }

  addAddresses(addresses) {
    if (!Array.isArray(addresses)) addresses = [addresses];
    this.addresses = [...this.addresses, ...addresses];
  }

  addPhones(phones) {
    if (!Array.isArray(phones)) phones = [phones];
    this.phones = [...this.phones, ...phones];
  }

  addEmails(emails) {
    if (!Array.isArray(emails)) emails = [emails];
    this.emails = [...this.emails, ...emails];
  }

  store() {
    return new Promise((resolve, reject) => {
      const text = `
        insert into contacts
          (first_name, last_name, birth)
        values ($1, $2, $3)
        returning id
      `;

      const params = [
        this.firstName,
        this.lastName,
        this.birth,
      ];

      db.query(text, params)
        .then(([{ id }]) => Promise.all([
          this._storeItems('addresses', id),
          this._storeItems('phones', id),
          this._storeItems('emails', id),
        ]))
        .then(() => resolve())
        .catch(err => reject(err));
      
    })
  }

  _storeItems(item, id) {
    const promises = [];

    for (var i = 0; i < this[item].length; i++) {
      promises.push(this[item][i].store(id));
    }

    return Promise.all(promises);
  }
}

module.exports = Contact;