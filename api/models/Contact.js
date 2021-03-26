const { db } = require('../lib');

class Contact {
  constructor({ firstName, lastName, birth }, id) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birth = birth;
    this.addresses = [];
    this.phones = [];
    this.emails = [];
    this.id = id;
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

  update({ firstName, lastName, dob }) {
    return new Promise((resolve, reject) => {
      const text = `
        update contacts set
          first_name = $1,
          last_name = $2,
          birth = $3
        where id = $4`;

      const params = [
        firstName || this.firstName,
        lastName || this.lastName,
        dob || this.dob,
        this.id,
      ];

      db.query(text, params)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  store() {
    return new Promise((resolve, reject) => {
      const text = `
        insert into contacts
          (first_name, last_name, birth)
        values ($1, $2, $3)
        returning id
      `;

      const params = [this.firstName, this.lastName, this.birth];

      db.query(text, params)
        .then(({ id }) => Promise.all([
          this._storeItems('addresses', id),
          this._storeItems('phones', id),
          this._storeItems('emails', id),
        ]))
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  static delete(id) {
    return db.query('delete from contacts where id = $1', [id]);
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        'select first_name firstName, last_name lastName, birth dob from contacts where id = $1',
        [id],
      )
        .then(contact => resolve(new Contact(contact, id)))
        .catch(err => reject(err));
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(
        `
        select array_to_json(array(select row_to_json(row) from (select
          c.first_name "firstName",
          c.last_name "lastName",
          to_char(c.birth, 'DD Mon YYYY') dob,
          c.id,
          array_to_json(array(select row_to_json(e) from (select * from emails where contact_id = c.id) e)) emails,
          array_to_json(array(select row_to_json(p) from (select * from phones where contact_id = c.id) p)) phones,
          array_to_json(array(select row_to_json(a) from (select * from addresses where contact_id = c.id) a)) addresses
        from contacts c) row)) "data"`,
      )
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }

  _storeItems(item, id) {
    const promises = [];

    for (let i = 0; i < this[item].length; i++) {
      promises.push(this[item][i].store(id));
    }

    return Promise.all(promises);
  }
}

module.exports = Contact;

