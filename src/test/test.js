const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return Hello, Node.js CI/CD Pipeline!', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello, Node.js CI/CD Pipeline!');
    expect(res.status).toBe(200);
  });
});
