const { db } = require('../lib');

class Phone {
  constructor(number, id) {
    this.number = number;
    this.id = +id;
  }

  store(contactId) {
    return new Promise((resolve, reject) => {
      if (this.id) reject(new Error('phone already stored'));
      const text = `
        insert into phones
          (contact_id, phone_number)
        values ($1, $2)
        returning id
      `;

      const params = [contactId, this.number];

      db.query(text, params)
        .then(({ id }) => {
          this.id = id;
          resolve(id);
        })
        .catch(err => reject(err));
    });
  }

  update(number) {
    return new Promise((resolve, reject) => {
      const text = `
        update phones set
          phone_number = $1
        where id = $2`;

      const params = [number || this.number, this.id];

      db.query(text, params)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('select * from phones where id = $1', [id])
        .then(({ phone_number }) => resolve(new Phone(phone_number, id)))
        .catch(err => reject(err));
    });
  }

  static delete(id) {
    return db.query('delete from phones where id = $1', [id]);
  }
}

module.exports = Phone;

