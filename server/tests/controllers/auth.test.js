// mock authService before any imports that use it
jest.mock('../../services/auth', () => ({
  registerUser: jest.fn((token) => {
    if (token === 'valid_token') {
      return Promise.resolve({ uid: 'user1', email: 'test@example.com' });
    } else {
      throw new Error('Invalid token');
    }
  }),
  loginUser: jest.fn((token) => {
    if (token === 'valid_token') {
      return Promise.resolve({ uid: 'user1', email: 'test@example.com' });
    } else {
      throw new Error('Invalid or expired token');
    }
  })
}));

const request = require('supertest');
const app = require('../../app');

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

  test('should return 401 if token is invalid on login', async () => {
    const res = await request(app)
      .post('/login')
      .set('Authorization', 'Bearer invalid_token');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid or expired token');
  });

  test('should return 201 and user info if token is valid on register', async () => {
    const res = await request(app)
      .post('/register')
      .set('Authorization', 'Bearer valid_token');

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('uid', 'user1');
    expect(res.body.message).toBe('User registered seccessfuly');
  });
});
