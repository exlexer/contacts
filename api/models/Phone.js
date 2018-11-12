const { db } = require('../lib');

class Phone {
  constructor(number, id) {
    this.number = number;
    this.id = id;
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

      const params = [
        contactId,
        this.number,
      ];

      db.query(text, params)
        .then(({ id }) => {
          this.id = id;
          resolve(id);
        })
        .catch(err => reject(err));
    })
  }

  static getById(id) {
    return new Promise((reject, resolve) => {
      db.query('select * from phones where id = $1', [id])
        .then(({ phone_number }) => resolve(new Phone(phone_number, id)))
        .catch(err => reject(err));
    });
  }

  static delete(id) {
    return db.query('delete from phones where id = $1', [id])
  }
}

module.exports = Phone;