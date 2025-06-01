const request = require('supertest');
const app = require('../../app'); // This should point to your Express app

describe('Auth Controller', () => {
  test('should return 401 if no token is provided on login', async () => {
    const res = await request(app).post('/login');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Token missing');
  });

  test('should return 401 if no token is provided on register', async () => {
    const res = await request(app).post('/register');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Token missing');
  });

  // Additional tests with valid or invalid tokens can be added here
});
