const request = require('supertest');
const assert = require('assert');
const app = require('../server');
const { db } = require('../api/lib');

describe('Addresses', () => {
  
  let server;
  
  beforeEach(async () => {
    await db.query('begin');
    server = app.listen();
  });
  
  afterEach(async () => {
    await db.query('rollback');
    server.close();
  });

  it('POST contact address succeeds', (done) => {
    inputContact()
      .then(({ contact }) => {
        request(server)
          .post(`/api/contacts/${contact}/addresses`)
          .send({
            line1: '456 Other St',
            line2: 'Apt 4',
            city: 'Nowhere',
            state: 'Okahoma',
            country: 'USA',
          })
          .expect(201, done);
      });
  });

  it('PATCH contact address succeeds', (done) => {
    inputContact()
      .then(({ address }) => {
        request(server)
          .patch(`/api/addresses/${address}`)
          .send({
            address: {
              line1: '789 Final St',
              line2: 'Apt 6',
              city: 'Nowhere',
              state: 'Okahoma',
              country: 'USA',
            },
          })
          .expect(200)
          .then(() => db.query('select * from addresses where id = $1', [address]))
          .then((address) => {
            assert(address.line_1, '789 Final St');
            assert(address.line_2, 'Apt 6');
            assert(address.city, 'Nowhere');
            assert(address.state, 'Okahoma');
            assert(address.country, 'USA');
            return done();
          });
      });
  });

  it('DELETE contact address succeeds', (done) => {
    inputContact()
      .then(({ address }) => {
        request(server)
          .delete(`/api/addresses/${address}`)
          .expect(200, done);
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

    const addressText = `
      insert into addresses (contact_id, line_1, line_2, city, state, country)
      values ($1, $2, $3, $4, $5, $6)
      returning id`;

    const contactParams = ['john', 'doe', new Date('01-20-1992')];
    const addressParams = ['123 Main St', 'Apt 2', 'Nowhere', 'Oklahoma', 'USA'];

    db.query(contactText, contactParams)
      .then(({ id }) => {
        contactId = id;
        return db.query(addressText, [contactId, ...addressParams]);
      })
      .then(({ id }) => resolve({ address: id, contact: contactId }))
      .catch(err => reject(err));
  })
};