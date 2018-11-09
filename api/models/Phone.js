const { db } = require('../lib');

class Phone {
  constructor(number) {
    this.number = number;
  }

  store(contactId) {
    return new Promise((resolve, reject) => {
      const text = `
        insert into phones
          (contact_id, phone_number)
        values ($1, $2)
        returning id
      `;

      const params = [
        contactId,
        this.number,
      ];

      db.query(text, params)
        .then(({ id }) => resolve(id))
        .catch(err => reject(err));
    })
  }
}

module.exports = Phone;