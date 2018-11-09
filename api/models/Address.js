const { db } = require('../lib');

class Address {
  constructor({ line1, line2, city, state, country }) {
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.state = state;
    this.country = country;
  }

  store(contactId) {
    return new Promise((resolve, reject) => {
      const text = `
        insert into addresses
          (contact_id, line1, line2, city, state, country)
        values ($1, $2, $3, $4, $5, $6)
        returning id
      `;

      const params = [
        contactId,
        this.line1,
        this.line2,
        this.city,
        this.state,
        this.country,
      ];

      db.query(text, params)
        .then(({ id }) => resolve(id))
        .catch(err => reject(err));
    })
  }
}

module.exports = Address;