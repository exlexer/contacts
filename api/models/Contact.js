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
        .then(({ id }) => Promise.all([
          this._storeItems('addresses', id),
          this._storeItems('phones', id),
          this._storeItems('emails', id),
        ]))
        .then(() => resolve())
        .catch(err => reject(err));
      
    })
  }

  static delete(id) {
    return db.query('delete from contacts where id = $1', [id])
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`
        select array_to_json(array(select row_to_json(row) from (select
          c.first_name "firstName",
          c.last_name "lastName",
          c.birth "dob",
          c.id,
          array_to_json(array(select row_to_json(e) from (select * from emails where contact_id = c.id) e)) emails,
          array_to_json(array(select row_to_json(p) from (select * from phones where contact_id = c.id) p)) phones,
          array_to_json(array(select row_to_json(a) from (select * from addresses where contact_id = c.id) a)) addresses
        from contacts c) row)) "data"`)
      .then(({ data }) => resolve(data))
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