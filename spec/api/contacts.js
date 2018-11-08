const request = require('supertest');
const app = require('../../server');

describe('Contacts', () => {
  
  let server;
  
  beforeEach(() => {
    server = app.listen();
  });
  
  afterEach(() => {
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
        dateOfBirth: '01/20/1992',
        addresses: [],
        phoneNumbers: [],
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
        dateOfBirth: '01/20/1992',
        addresses: [],
        phoneNumbers: ['18012223333'],
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
        dateOfBirth: '01/20/1992',
        addresses: [],
        phoneNumbers: ['18012223333'],
        emails: ['member@example.com'],
      })
      .expect(201, done);
  });
});