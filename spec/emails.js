const request = require('supertest');
const app = require('../server');
const { db } = require('../api/lib');

describe('Emails', () => {
  
  let server;
  
  beforeEach(async () => {
    await db.query('begin');
    server = app.listen();
  });
  
  afterEach(async () => {
    await db.query('rollback');
    server.close();
  });
  
  it('POST contact email succeeds', (done) => {
    inputContact()
      .then(({ contact }) => {
        request(server)
          .post(`/api/contacts/${contact}/emails`)
          .send({ email: 'member@other.com' })
          .expect(201, done);
      });
  });

  it('PATCH contact email succeeds', (done) => {
    inputContact()
      .then(({ email }) => {
        request(server)
          .patch(`/api/emails/${email}`)
          .send({ email: 'member@another.com' })
          .expect(204, done);
      });
  });

  it('DELETE contact email succeeds', (done) => {
    inputContact()
      .then(({ email }) => {
        request(server)
          .delete(`/api/emails/${email}`)
          .expect(204, done);
      });
  });

});

function inputContact() {
  return new Promise((resolve, reject) => {
    let contactId;

    const contactText = `
      insert into contacts (first_name, last_name, birth)
      values ($1, $2, $3)
      returning id`;

    const emailText = `
      insert into emails (contact_id, email)
      values ($1, $2)
      returning id`;

    const contactParams = ['john', 'doe', new Date('01-20-1992')];
    const emailParams = ['member@example.com'];

    db.query(contactText, contactParams)
      .then(({ id }) => {
        contactId = id;
        return db.query(emailText, [contactId, ...emailParams]);
      })
      .then(({ id }) => resolve({ email: id, contact: contactId }))
      .catch(err => reject(err));
  })
};