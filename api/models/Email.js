const { db } = require('../lib');

class Email {
  constructor(email, id) {
    this.email = email;
    this.id = +id;
  }

  store(contactId) {
    return new Promise((resolve, reject) => {
      if (this.id) reject(new Error('email already stored'));
      const text = `
        insert into emails (contact_id, email)
        values ($1, $2)
        returning id
      `;

      const params = [contactId, this.email];

      db.query(text, params)
        .then(({ id }) => {
          this.id = id;
          resolve(id);
        })
        .catch(err => reject(err));
    });
  }

  update(email) {
    return new Promise((resolve, reject) => {
      const text = `
        update emails set
          email = $1
        where id = $2`;

      const params = [email || this.email, this.id];

      db.query(text, params)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('select * from emails where id = $1', [id])
        .then(({ email }) => resolve(new Email(email, id)))
        .catch(err => reject(err));
    });
  }

  static delete(id) {
    return db.query('delete from emails where id = $1', [id]);
  }
}

module.exports = Email;

