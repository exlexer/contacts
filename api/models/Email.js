const { db } = require('../lib');

class Email {
  constructor(email) {
    this.email = email;
  }

  store(contactId) {
    return new Promise((resolve, reject) => {
      const text = `
        insert into emails
          (contact_id, email)
        values ($1, $2)
        returning id
      `;
      
      const params = [
        contactId,
        this.email,
      ];

      db.query(text, params)
        .then(({ id }) => { 
          resolve(id)
        })
        .catch(err => reject(err));
    })
  }
}

module.exports = Email;