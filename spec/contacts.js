const request = require('supertest');
const app = require('../server');
const { db } = require('../api/lib');

describe('Contacts', () => {
  
  let server;
  
  beforeEach(async () => {
    db.query('begin');
    server = app.listen();
  });
  
  afterEach(async () => {
    db.query('rollback');
    server.close();
  });

  it('GET contact returns 200', (done) => {
    request(server)
      .get('/api/contacts')
      .expect(200, done);
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
        phones: ['18012223333'],
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
        phones: ['18012223333'],
        emails: ['member@example.com'],
      })
      .expect(201, done);
  });


  it('DELETE contact succeeds', (done) => {
    request(server)
      .delete('/api/contacts')
      .send({
        id: 22,
      })
      .expect(204, done);
  });
});