const request = require('supertest');
const app = require('../server');
const { db } = require('../api/lib');

describe('Phones', () => {
  
  let server;
  
  beforeEach(async () => {
    await db.query('begin');
    server = app.listen();
  });
  
  afterEach(async () => {
    await db.query('rollback');
    server.close();
  });

  it('POST contact phone succeeds', (done) => {
    inputContact()
      .then(({ contact }) => {
        request(server)
          .post(`/api/contacts/${contact}/phones`)
          .send({ phone: '18004446666' })
          .expect(201, done);
      });
  });

  it('DELETE contact phone succeeds', (done) => {
    inputContact()
      .then(({ phone }) => {
        request(server)
          .delete(`/api/phones/${phone}`)
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

    const phoneText = `
      insert into phones (contact_id, phone_number)
      values ($1, $2)
      returning id`;

    const contactParams = ['john', 'doe', new Date('01-20-1992')];
    const phoneParams = ['18005555555'];

    db.query(contactText, contactParams)
      .then(({ id }) => {
        contactId = id;
        return db.query(phoneText, [contactId, ...phoneParams]);
      })
      .then(({ id }) => resolve({ phone: id, contact: contactId }))
      .catch(err => reject(err));
  })
};