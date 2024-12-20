const request = require('supertest');
const { app, server } = require('../app'); 

describe('GET /', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, Node.js CI/CD Pipeline!');
  });

  afterAll((done) => {
    server.close(done);
  });
});
