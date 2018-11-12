const request = require('supertest');
const app = require('../server');
const { db } = require('../api/lib');

describe('Contacts', () => {
  
  let server;
  
  beforeEach(async () => {
    await db.query('begin');
    server = app.listen();
  });
  
  afterEach(async () => {
    await db.query('rollback');
    server.close();
  });

  it('GET contact returns 200', (done) => {
    inputContact()
      .then(() => {
        request(server)
          .get('/api/contacts')
          .expect(({ body }) => {
            if (!Array.isArray(body)) throw new Error('body must be array');
            const rows = body.filter(contact => 
              (contact.firstName === 'john') &&
              (contact.lastName === 'doe') &&
              (contact.dob === '1992-01-20')
            );
            if (rows.length === 0) throw new Error('missing posted contact');
            if (!rows[0].phones.length) throw new Error('missing phones');
            if (!rows[0].emails.length) throw new Error('missing emails');
          })
          .expect(200, done);
      });
  });

  it('POST empty contact fails', (done) => {
    request(server)
      .post('/api/contacts')
      .expect(400, done);
  });

  it('POST contact with zero phone numbers fails', (done) => {
    request(server)
      .post('/api/contacts')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        dob: '01/20/1992',
        addresses: [],
        phones: [],
        emails: ['member@example.com'],
      })
      .expect(400, done);
  });

  it('POST contact with zero emails fails', (done) => {
    request(server)
      .post('/api/contacts')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        dob: '01/20/1992',
        addresses: [],
        phones: ['18005555555'],
        emails: [],
      })
      .expect(400, done);
  });

  it('POST full contact succeeds', (done) => {
    request(server)
      .post('/api/contacts')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        dob: '01/20/1992',
        addresses: [],
        phones: ['18005555555'],
        emails: ['member@example.com'],
      })
      .expect(201, done);
  });

  it('DELETE contact succeeds', (done) => {
    inputContact()
      .then((id) => {
        request(server)
          .delete(`/api/contacts/${id}`)
          .expect(204, done);
      })
  });
});

function inputContact() {
  return new Promise((resolve, reject) => {
    let contactId;
    db.query(`
      insert into contacts
          (first_name, last_name, birth)
      values ($1, $2, $3)
        returning id`, ['john', 'doe', new Date('01-20-1992')])
      .then(({ id }) => {
        contactId = id;
        return db.query(`
          insert into addresses (contact_id, line_1, line_2, city, state, country)
          values ($1, $2, $3, $4, $5, $6)`,
          [contactId, '123 Main St', 'Apt 2', 'Nowhere', 'Oklahoma', 'USA']);
      })
      .then(() => db.query(`
        insert into phones (contact_id, phone_number)
        values ($1, $2)`,
        [contactId, '18005555555']))
      .then(() => db.query(`
        insert into emails (contact_id, email)
        values ($1, $2)`,
        [contactId, 'member@example.com']))
      .then(() => resolve(contactId))
      .catch(err => reject(err));
  })
};